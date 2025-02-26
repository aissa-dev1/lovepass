import { LovePassCardType } from "@/components/love-pass-card";
import { Card } from "@/lib/models/card";
import { generateLovePassId } from "@/utils/generate-lovepass-id";
import { verifyAuthToken } from "@/lib/verify-auth-token";
import {
  badRequest,
  created,
  ok,
  tooManyRequests,
  unAuthorized,
} from "../utils/response";
import { RateLimit, RateLimitType } from "@/lib/models/rate-limit";
import { handleRateLimit } from "@/lib/handle-rate-limit";

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

  const rateLimit = (await RateLimit.findOne({
    fingerprint: authToken.fingerprint,
    route: { name: "cards", method: "POST" },
  }).lean()) as RateLimitType | null;
  const {
    createRateLimit,
    checkToResetRateCount,
    checkToUpdateRateCount,
    reachedRateLimit,
  } = await handleRateLimit();

  if (rateLimit) {
    await checkToResetRateCount(rateLimit);
    await checkToUpdateRateCount(rateLimit);

    if (reachedRateLimit(rateLimit)) {
      return tooManyRequests();
    }
  } else {
    await createRateLimit(authToken.fingerprint, {
      name: "cards",
      method: "POST",
    });
  }

  const lovePassId = generateLovePassId();
  await Card.create({
    ...data,
    userAuthToken: authToken.token,
    lovePassId,
  });
  return created(lovePassId);
}
