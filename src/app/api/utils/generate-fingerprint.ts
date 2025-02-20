import crypto from "crypto";

export function generateFingerprint(req: Request): string {
  return crypto
    .createHash("sha256")
    .update(
      `${req.headers.get("user-agent")}${req.headers.get(
        "accept"
      )}${req.headers.get("x-forwarded-for")}`
    )
    .digest("hex");
}
