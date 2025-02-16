export function updateAuthToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function hasAuthToken(): boolean {
  return getAuthToken() !== null;
}
