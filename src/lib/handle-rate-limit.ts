"use server";

import { RateLimit, RateLimitRoute, RateLimitType } from "./models/rate-limit";

interface VerifyRateLimitOptions {
  maxRequests?: number;
  countResetMs?: number;
}

export async function handleRateLimit(options?: VerifyRateLimitOptions) {
  function createRateLimit(fingerprint: string, route: RateLimitRoute) {
    return RateLimit.create({
      fingerprint: fingerprint,
      route: { name: route.name, method: route.method },
      count: 1,
      limit: options?.maxRequests || 10,
      lastRequest: new Date(),
    });
  }

  function checkToResetRateCount(rateLimit: RateLimitType) {
    if (
      Date.now() - rateLimit.lastRequest.getTime() >=
      (options?.countResetMs || 60000)
    ) {
      return RateLimit.updateOne({
        fingerprint: rateLimit.fingerprint,
        route: { name: rateLimit.route.name, method: rateLimit.route.method },
        $set: { count: 0 },
      });
    }
    return Promise.resolve();
  }

  function checkToUpdateRateCount(rateLimit: RateLimitType) {
    if (rateLimit.count < rateLimit.limit) {
      return RateLimit.updateOne({
        fingerprint: rateLimit.fingerprint,
        route: { name: rateLimit.route.name, method: rateLimit.route.method },
        $set: { count: rateLimit.count + 1, lastRequest: new Date() },
      });
    }
    return Promise.resolve();
  }

  function reachedRateLimit(rateLimit: RateLimitType): boolean {
    return (
      rateLimit.count >= rateLimit.limit &&
      Date.now() - rateLimit.lastRequest.getTime() <
        (options?.countResetMs || 60000)
    );
  }

  return {
    createRateLimit,
    checkToResetRateCount,
    checkToUpdateRateCount,
    reachedRateLimit,
  };
}
