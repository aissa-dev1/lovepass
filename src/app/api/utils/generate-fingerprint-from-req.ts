import crypto from "crypto";

export function generateFingerprintFromReq(req: Request): string {
  const data = `${req.headers.get("user-agent")}${req.headers.get(
    "accept"
  )}${req.headers.get("x-forwarded-for")}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}
