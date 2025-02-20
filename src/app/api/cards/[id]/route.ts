import { Card } from "@/lib/models/card";
import { verifyAuthToken } from "@/lib/verify-auth-token";
import { ok, unAuthorized } from "../../utils/response";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const card = await Card.findOne({ lovePassId: params.id }).lean();
  return ok(JSON.stringify(card));
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authToken = await verifyAuthToken(req);

  if (!authToken) {
    return unAuthorized();
  }

  await Card.findOneAndDelete({ lovePassId: params.id });
  return ok("Card deleted successfully");
}
