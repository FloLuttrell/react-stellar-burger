import {API_BASE_URL} from "./consts";
import {fetchJson, getAuthTokens, setAuthTokens} from "./functions";

export const refreshTokens = async () => {
  const {refreshToken} = getAuthTokens();
  if (!refreshToken) {
    throw new Error("Unable to refresh token");
  }
  const tokenResp = await fetchJson(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    body: {token: refreshToken}
  });
  if (!tokenResp.resp.ok) {
    setAuthTokens({refreshToken: undefined, accessToken: undefined});
    throw new Error("Unable to refresh token");
  }
  setAuthTokens(tokenResp.data);
  return getAuthTokens();
};