import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

// We use a proxy to redirect requests
// The proxy configuration is in the file vite.config.js
const BASE_URL = "/api";

class AuthService extends HttpClient {
  async login(email, password) {
    try {
      return await this.post("/login", {
        data: {
          email,
          password,
        },
      });
    } catch (e) {
      throw Error(e);
    }
  }
  // Method for getting current user data
  async whoAmI() {
    try {
      return await this.get("/whoAmI");
    } catch (e) {
      throw Error(e);
    }
  }
  async logout() {
    try {
      await this.delete("/logout");
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new AuthService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
