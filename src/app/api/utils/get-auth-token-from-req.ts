export function getAuthTokenFromReq(req: Request): string | null {
  return req.headers.get("authorization")?.replace("Bearer ", "") || null;
}
