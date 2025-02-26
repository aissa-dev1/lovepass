import { Card } from "@/lib/models/card";
import { verifyAuthToken } from "@/lib/verify-auth-token";
import {
  badRequest,
  notFound,
  ok,
  tooManyRequests,
  unAuthorized,
} from "../../utils/response";
import { LovePassCardType } from "@/components/love-pass-card";
import { RateLimit, RateLimitType } from "@/lib/models/rate-limit";
import { handleRateLimit } from "@/lib/handle-rate-limit";
import { generateFingerprint } from "../../utils/generate-fingerprint";

export async function GET(
  req: Request,
  { params }: { params: { lovePassId: string } }
) {
  const lovePass = (await Card.findOne({
    lovePassId: params.lovePassId,
  })
    .select("-fingerprint")
    .lean()) as LovePassCardType | null;
  delete lovePass?.fingerprint;
  return ok(JSON.stringify(lovePass));
}

export async function PATCH(
  req: Request,
  { params }: { params: { lovePassId: string } }
) {
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
    route: { name: "cards/lovePassId", method: "PATCH" },
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
      name: "cards/lovePassId",
      method: "PATCH",
    });
  }

  const lovePass = (await Card.findOne({
    lovePassId: params.lovePassId,
  }).lean()) as LovePassCardType | null;

  if (!lovePass) {
    return notFound("LovePass not found");
  }
  if (lovePass.fingerprint !== generateFingerprint(req)) {
    return unAuthorized();
  }

  await Card.updateOne(
    { lovePassId: params.lovePassId },
    {
      $set: {
        to: data.to,
        from: data.from,
        message: data.message,
        backgroundColor: data.backgroundColor,
        emoji: data.emoji,
      },
    }
  );
  return ok("LovePass updated successfully");
}

export async function DELETE(
  req: Request,
  { params }: { params: { lovePassId: string } }
) {
  const authToken = await verifyAuthToken(req);

  if (!authToken) {
    return unAuthorized();
  }

  const lovePass = (await Card.findOne({
    lovePassId: params.lovePassId,
  }).lean()) as LovePassCardType | null;

  if (!lovePass) {
    return notFound("LovePass not found");
  }
  if (lovePass.fingerprint !== generateFingerprint(req)) {
    return unAuthorized();
  }

  await Card.deleteOne({ lovePassId: params.lovePassId });
  return ok("LovePass deleted successfully");
}
