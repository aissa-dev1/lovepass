import { AuthToken } from "@/lib/models/auth-token";
import { generateFingerprintFromReq } from "../../utils/generate-fingerprint-from-req";
import { getAuthTokenFromReq } from "../../utils/get-auth-token-from-req";
import { Card } from "@/lib/models/card";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const card = await Card.findOne({ lovePassId: params.id });
  return new Response(JSON.stringify(card), { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = getAuthTokenFromReq(req);
  const fingerprint = generateFingerprintFromReq(req);

  const authToken = await AuthToken.findOne({ token, fingerprint });

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  await Card.findOneAndDelete({ lovePassId: params.id });
  return new Response("Card deleted successfully", { status: 200 });
}
