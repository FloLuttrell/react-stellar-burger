import {API_BASE_URL} from "./consts";
import {AuthTokens, fetchJson, getAuthTokens, setAuthTokens} from "./functions";

export const refreshTokens = async (): Promise<AuthTokens> => {
  const {refreshToken: token} = getAuthTokens();
  if (!token) {
    throw new Error("Unable to refresh token");
  }
  const tokenResp = await fetchJson(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    body: {token}
  });
  if (!tokenResp.resp.ok) {
    setAuthTokens({refreshToken: undefined, accessToken: undefined});
    throw new Error("Unable to refresh token");
  }
  setAuthTokens(tokenResp.data);
  const {accessToken, refreshToken} = getAuthTokens()
  if (!accessToken || !refreshToken) {
    throw new Error("Unable to save token");
  }
  return {accessToken, refreshToken};
};