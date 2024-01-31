import {API_BASE_URL} from "./consts";
import {BURGER_APP_ACCESS_TOKEN_KEY, BURGER_APP_REFRESH_TOKEN_KEY} from "../services/reducers/auth";

export const request = async (url, options) => {
  const resp = await fetch(url, options);
  if (!resp.ok) {
    throw new Error(`Ошибка ${resp.status}`);
  }
  return resp.json();
};

export const fetchJson = async (url, options) => {
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
  if (!contentType.includes("application/json")) {
    throw new Error("Response is not JSON");
  }
  const data = await resp.json();
  return {resp, data};
};

let refreshTokenPromise = undefined;

export const fetchJsonWithAuth = async (url, options) => {
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

export const setAuthTokens = ({refreshToken, accessToken}) => {
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

export const getAuthTokens = () => {
  const refreshToken = localStorage.getItem(BURGER_APP_REFRESH_TOKEN_KEY);
  const accessToken = localStorage.getItem(BURGER_APP_ACCESS_TOKEN_KEY);
  return {refreshToken, accessToken};
};