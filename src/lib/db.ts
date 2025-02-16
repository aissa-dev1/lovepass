"use server";

import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const dbName =
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "passlove-dev"
        : "passlove";
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URI as string, {
      dbName,
    });
    console.log("db connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
