import { Schema, model, models, type Document, type Model } from "mongoose";

export const PROGRAM_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
export type ProgramLevel = (typeof PROGRAM_LEVELS)[number];

export interface ProgramDocument extends Document {
  title: string;
  description: string;
  thumbnail: string;
  /** ImageKit file id, used to delete the file when replaced. Internal; not returned by the API. */
  thumbnailFileId: string | null;
  level: ProgramLevel;
  duration: string;
  /** Display text such as "২.৫K"; null hides the badge. */
  enrollmentCount: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const programSchema = new Schema<ProgramDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    thumbnail: { type: String, required: true, trim: true, maxlength: 500 },
    thumbnailFileId: { type: String, default: null },
    level: { type: String, enum: PROGRAM_LEVELS, required: true, default: "Beginner" },
    duration: { type: String, required: true, trim: true, maxlength: 60 },
    enrollmentCount: { type: String, trim: true, maxlength: 20, default: null },
    isPublished: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

programSchema.index({ isPublished: 1, createdAt: -1 });

export const Program: Model<ProgramDocument> =
  models.Program ?? model<ProgramDocument>("Program", programSchema);

export function toPublicProgram(program: ProgramDocument) {
  return {
    id: String(program._id),
    title: program.title,
    description: program.description,
    thumbnail: program.thumbnail,
    level: program.level,
    duration: program.duration,
    enrollmentCount: program.enrollmentCount ?? null,
    isPublished: program.isPublished,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  };
}

export type PublicProgram = ReturnType<typeof toPublicProgram>;
