/**
 * Routine enums and limits, kept free of mongoose so client components (the admin form)
 * can import them without pulling the database driver into the browser bundle.
 */

/** Badge colour of a time slot on the routine page. */
export const ROUTINE_VARIANTS = ["blue", "rose", "teal"] as const;
export type RoutineVariant = (typeof ROUTINE_VARIANTS)[number];

/** Lucide icon component name shown on the class card, e.g. "BookOpen". Any Lucide icon is allowed. */
export const DEFAULT_ROUTINE_ICON = "BookOpen";

export const ROUTINE_LIMITS = {
  classTitle: 100,
  icon: 64,
  days: 100,
  time: 60,
  maxGroups: 14,
  maxSlotsPerGroup: 12,
} as const;

export interface RoutineTimeSlot {
  /** Display text, e.g. "সকাল ৮:০০ - ৯:০০". */
  time: string;
  variant: RoutineVariant;
}

export interface RoutineScheduleGroup {
  /** Display text, e.g. "শনি, সোম, বুধ". */
  days: string;
  timeSlots: RoutineTimeSlot[];
}
