"use server";

import { model, models, Schema } from "mongoose";

export type RateLimitType = {
  fingerprint: string;
  route: RateLimitRoute;
  count: number;
  limit: number;
  lastRequest: Date;
};

export type RateLimitRoute = {
  name: string;
  method: string;
};

const rateLimitSchema = new Schema(
  {
    fingerprint: { type: String, required: true },
    route: {
      name: { type: String, required: true },
      method: { type: String, required: true },
    },
    count: { type: Number, required: true },
    limit: { type: Number, required: true },
    lastRequest: { type: Date, required: true },
  },
  { timestamps: true }
);

export const RateLimit =
  models.RateLimit || model("RateLimit", rateLimitSchema);
