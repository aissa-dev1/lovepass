"use server";

import { getAuthToken } from "@/app/api/utils/get-auth-token";
import { AuthToken } from "./models/auth-token";
import { generateFingerprint } from "@/app/api/utils/generate-fingerprint";

export async function verifyAuthToken(req: Request) {
  return (await AuthToken.findOne({
    token: getAuthToken(req),
    fingerprint: generateFingerprint(req),
  })
    .lean()
    .exec()) as { token: string; fingerprint: string } | null;
}
