import { Schema, model, models, type Document, type Model } from "mongoose";

import {
  DEFAULT_ROUTINE_ICON,
  ROUTINE_LIMITS,
  ROUTINE_VARIANTS,
  type RoutineScheduleGroup,
  type RoutineTimeSlot,
} from "./routine.constants";

export * from "./routine.constants";

/** One class card on the routine page, e.g. "নবম শ্রেণি". */
export interface RoutineDocument extends Document {
  classTitle: string;
  /** Lucide icon component name, e.g. "BookOpen". */
  icon: string;
  scheduleGroups: RoutineScheduleGroup[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const timeSlotSchema = new Schema<RoutineTimeSlot>(
  {
    time: { type: String, required: true, trim: true, maxlength: ROUTINE_LIMITS.time },
    variant: { type: String, enum: ROUTINE_VARIANTS, required: true, default: "blue" },
  },
  { _id: false }
);

const scheduleGroupSchema = new Schema<RoutineScheduleGroup>(
  {
    days: { type: String, required: true, trim: true, maxlength: ROUTINE_LIMITS.days },
    timeSlots: {
      type: [timeSlotSchema],
      validate: {
        validator: (slots: unknown[]) => slots.length >= 1 && slots.length <= ROUTINE_LIMITS.maxSlotsPerGroup,
        message: `Each schedule group needs 1–${ROUTINE_LIMITS.maxSlotsPerGroup} time slots`,
      },
    },
  },
  { _id: false }
);

const routineSchema = new Schema<RoutineDocument>(
  {
    classTitle: { type: String, required: true, trim: true, maxlength: ROUTINE_LIMITS.classTitle },
    icon: { type: String, required: true, trim: true, maxlength: ROUTINE_LIMITS.icon, default: DEFAULT_ROUTINE_ICON },
    scheduleGroups: {
      type: [scheduleGroupSchema],
      validate: {
        validator: (groups: unknown[]) => groups.length >= 1 && groups.length <= ROUTINE_LIMITS.maxGroups,
        message: `A routine needs 1–${ROUTINE_LIMITS.maxGroups} schedule groups`,
      },
    },
    isPublished: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

routineSchema.index({ isPublished: 1, createdAt: -1 });

export const Routine: Model<RoutineDocument> =
  models.Routine ?? model<RoutineDocument>("Routine", routineSchema);

export function toPublicRoutine(routine: RoutineDocument) {
  return {
    id: String(routine._id),
    classTitle: routine.classTitle,
    icon: routine.icon,
    scheduleGroups: routine.scheduleGroups.map((group) => ({
      days: group.days,
      timeSlots: group.timeSlots.map((slot) => ({ time: slot.time, variant: slot.variant })),
    })),
    isPublished: routine.isPublished,
    createdAt: routine.createdAt,
    updatedAt: routine.updatedAt,
  };
}

export type PublicRoutine = ReturnType<typeof toPublicRoutine>;
