import { Schema, model, models, type Document } from "mongoose";

export interface AdminDocument extends Document {
  email: string;
  passwordHash: string;
  name: string;
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    tokenVersion: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Admin = models.Admin ?? model<AdminDocument>("Admin", adminSchema);
