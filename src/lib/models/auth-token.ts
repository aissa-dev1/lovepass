"use server";

import { Schema, model, models } from "mongoose";

export type AuthTokenType = { token: string; fingerprint: string };

const authTokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    fingerprint: { type: String, required: true },
  },
  { timestamps: true }
);

export const AuthToken =
  models.AuthToken || model("AuthToken", authTokenSchema);
