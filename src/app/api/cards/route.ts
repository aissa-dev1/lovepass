import { LovePassCardType } from "@/components/love-pass-card";
import { Card } from "@/lib/models/card";
import { generateLovePassId } from "@/utils/generate-lovepass-id";
import { verifyAuthToken } from "@/lib/verify-auth-token";
import { badRequest, created, ok, unAuthorized } from "../utils/response";

export async function GET(req: Request) {
  const authToken = await verifyAuthToken(req);

  if (!authToken) {
    return unAuthorized();
  }

  const cards = await Card.find({
    userAuthToken: authToken.token,
  }).lean();
  return ok(JSON.stringify(cards));
}

export async function POST(req: Request) {
  const authToken = await verifyAuthToken(req);

  if (!authToken) {
    return unAuthorized();
  }

  const data: LovePassCardType = await req.json();

  if (!data.to || !data.from || !data.message) {
    return badRequest("Missing required fields");
  }
  if (!data.backgroundColor) {
    return badRequest("Please select a background color");
  }
  if (!data.emoji) {
    return badRequest("Please pick an emoji");
  }

  const lovePassId = generateLovePassId();
  await Card.create({
    ...data,
    userAuthToken: authToken.token,
    lovePassId,
  });
  return created(lovePassId);
}
