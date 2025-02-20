import { AuthToken } from "@/lib/models/auth-token";
import { generateFingerprint } from "../utils/generate-fingerprint";
import { created, ok } from "../utils/response";

export async function POST(req: Request) {
  const token = crypto.randomUUID();
  const fingerprint = generateFingerprint(req);
  const authToken = (await AuthToken.findOne({ fingerprint })
    .lean()
    .exec()) as { token: string; fingerprint: string } | null;

  if (authToken) {
    return ok(authToken.token);
  }

  await AuthToken.create({ token, fingerprint });
  return created(token);
}
