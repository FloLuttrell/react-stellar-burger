import {BURGER_APP_ACCESS_TOKEN_KEY, BURGER_APP_REFRESH_TOKEN_KEY} from "../services/reducers/auth";
import {refreshTokens} from "./api";

export type AuthTokens = {
  accessToken: string,
  refreshToken: string
}

export const fetchJson = async (url:  string | URL | globalThis.Request, options?: any) => {
  const newOptions = {...options};
  if (newOptions.body) {
    newOptions.headers ??= {};
    newOptions.headers["Content-Type"] = "application/json";
    newOptions.body = JSON.stringify(newOptions.body);
  }
  const resp = await fetch(url, newOptions);
  if (resp.status === 401) {

  }
  const contentType = resp.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("Response is not JSON");
  }
  const data = await resp.json();
  return {resp, data};
};

let refreshTokenPromise: undefined | Promise<{ accessToken: string, refreshToken: string }> = undefined;

export const fetchJsonWithAuth = async (url:  string | URL | globalThis.Request, options: any) => {
  const {accessToken} = getAuthTokens();
  const newOptions = {...options};
  newOptions.headers ??= {};
  newOptions.headers["Authorization"] = accessToken;
  const {resp, data} = await fetchJson(url, newOptions);
  if (resp.ok) {
    return {resp, data};
  }
  if (resp.status >= 400 && resp.status < 500) {
    // in case access token invalid (due to expires after 20min)
    // we receive error 401(?), refresh token and try one more time
    try {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokens();
      }
      const {accessToken} = await refreshTokenPromise;
      refreshTokenPromise = undefined;
      newOptions.headers["Authorization"] = accessToken;
      const {resp, data} = await fetchJson(url, newOptions);
      return {resp, data};
    } catch (err) {
      refreshTokenPromise = undefined;
    }
  }
  throw new Error("Unable make fetchJsonWithAuth");
};

export const setAuthTokens = ({refreshToken, accessToken}: Partial<AuthTokens>) => {
  if (refreshToken === undefined) {
    localStorage.removeItem(BURGER_APP_REFRESH_TOKEN_KEY);
  } else {
    localStorage.setItem(BURGER_APP_REFRESH_TOKEN_KEY, refreshToken);
  }
  if (accessToken === undefined) {
    localStorage.removeItem(BURGER_APP_ACCESS_TOKEN_KEY);
  } else {
    localStorage.setItem(BURGER_APP_ACCESS_TOKEN_KEY, accessToken);
  }
};

export const getAuthTokens = (): Partial<AuthTokens> => {
  const refreshToken = localStorage.getItem(BURGER_APP_REFRESH_TOKEN_KEY) ?? undefined;
  const accessToken = localStorage.getItem(BURGER_APP_ACCESS_TOKEN_KEY) ?? undefined;
  return {refreshToken, accessToken};
};