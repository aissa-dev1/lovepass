import { AuthToken } from "@/lib/models/auth-token";
import { generateFingerprintFromReq } from "../utils/generate-fingerprint-from-req";

export async function POST(req: Request) {
  const token = crypto.randomUUID();
  const fingerprint = generateFingerprintFromReq(req);
  const authToken = await AuthToken.findOne({ fingerprint });

  if (authToken) {
    return new Response(authToken.token, { status: 201 });
  }

  const newAuthToken = await AuthToken.create({ token, fingerprint });
  await newAuthToken.save();
  return new Response(token, { status: 201 });
}
