export function unAuthorized(message?: string): Response {
  return new Response(message || "Unauthorized", { status: 401 });
}

export function badRequest(message?: string): Response {
  return new Response(message || "Bad Request", { status: 400 });
}

export function notFound(message?: string): Response {
  return new Response(message || "Not Found", { status: 404 });
}

export function serverError(message?: string): Response {
  return new Response(message || "Internal Server Error", { status: 500 });
}

export function created(message?: string): Response {
  return new Response(message || "Created", { status: 201 });
}

export function ok(message?: string): Response {
  return new Response(message || "OK", { status: 200 });
}
