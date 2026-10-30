import { Schema, model, models, type Document } from "mongoose";

export const USER_ROLES = ["admin", "user"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: USER_ROLES, required: true, default: "user" },
    tokenVersion: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const User = models.User ?? model<UserDocument>("User", userSchema);

export function toPublicUser(user: UserDocument) {
  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
