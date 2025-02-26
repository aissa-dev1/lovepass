"use server";

import { getAuthToken } from "@/app/api/utils/get-auth-token";
import { AuthToken, AuthTokenType } from "./models/auth-token";
import { generateFingerprint } from "@/app/api/utils/generate-fingerprint";

export async function verifyAuthToken(
  req: Request
): Promise<AuthTokenType | null> {
  return (await AuthToken.findOne({
    token: getAuthToken(req),
    fingerprint: generateFingerprint(req),
  })
    .lean()
    .exec()) as AuthTokenType | null;
}
