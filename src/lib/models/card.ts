"use server";

import { Schema, model, models } from "mongoose";

const cardSchema = new Schema(
  {
    userAuthToken: { type: String, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
    message: { type: String, required: true },
    lovePassId: { type: String, required: true },
    emoji: { type: String, required: true },
    backgroundColor: { type: String, required: true },
  },
  { timestamps: true }
);

export const Card = models.Card || model("Card", cardSchema);
