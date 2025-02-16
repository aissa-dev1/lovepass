import axios from "axios";

export class AuthTokenService {
  async post(): Promise<string> {
    const authToken = await axios.post("/api/auth-token");
    return authToken.data;
  }
}
