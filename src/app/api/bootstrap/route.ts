import { connectToDatabase } from "@/lib/db";

export async function POST() {
  await connectToDatabase();
  return new Response("Hello, PassLove!");
}
