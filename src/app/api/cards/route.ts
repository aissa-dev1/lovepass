import { LovePassCardType } from "@/components/love-pass-card";
import { getAuthTokenFromReq } from "../utils/get-auth-token-from-req";
import { generateFingerprintFromReq } from "../utils/generate-fingerprint-from-req";
import { AuthToken } from "@/lib/models/auth-token";
import { Card } from "@/lib/models/card";
import { generateLovePassId } from "@/utils/generate-lovepass-id";

export async function GET(req: Request) {
  const token = getAuthTokenFromReq(req);
  const fingerprint = generateFingerprintFromReq(req);
  const authToken = await AuthToken.findOne({ token, fingerprint });

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cards = await Card.find({ userAuthToken: token });
  return new Response(JSON.stringify(cards), { status: 200 });
}

export async function POST(req: Request) {
  const data: LovePassCardType = await req.json();
  const token = getAuthTokenFromReq(req);
  const fingerprint = generateFingerprintFromReq(req);
  const authToken = await AuthToken.findOne({ token, fingerprint });

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!data.to || !data.from || !data.message) {
    return new Response("Missing required fields", { status: 400 });
  }
  if (!data.backgroundColor) {
    return new Response("Please select a background color", { status: 400 });
  }
  if (!data.emoji) {
    return new Response("Please pick an emoji", { status: 400 });
  }

  const card = await Card.create({
    ...data,
    userAuthToken: authToken.token,
    lovePassId: generateLovePassId(),
  });
  await card.save();
  return new Response(card.lovePassId, { status: 201 });
}
