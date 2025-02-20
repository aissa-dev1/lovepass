import { connectToDatabase } from "@/lib/db";
import { ok } from "../utils/response";

export async function POST() {
  await connectToDatabase();
  return ok("Hello, PassLove!");
}
