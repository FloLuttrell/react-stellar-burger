import {createAsyncThunk} from "@reduxjs/toolkit"
import {refreshTokens} from "../../utils/api";
import {fetchJson, fetchJsonWithAuth, getAuthTokens, setAuthTokens} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";

export const authRefreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const {accessToken, refreshToken} = await refreshTokens()
  return {accessToken, refreshToken}
})

export const authFetchUser = createAsyncThunk<
  { name: string, email: string }
>('auth/fetchUser', async () => {
  const {resp, data} = await fetchJsonWithAuth(`${API_BASE_URL}/auth/user`, {});
  if (!resp.ok || !data.success) {
    throw new Error("authFetchUser: unable to fetch user")
  }
  return data.user;
})

export const authLogin = createAsyncThunk<
  {
    accessToken: string,
    refreshToken: string,
    user: { name: string, email: string }
  },
  { email: string, password: string }
>('auth/login', async ({email, password}) => {
  const {resp, data} = await fetchJson(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: {email, password}
  });
  if (!resp.ok || !data.success) {
    throw new Error("authLogin: unable to login")
  }
  const typedData = data;
  setAuthTokens(typedData);
  return typedData.user;
});

export const authLogout = createAsyncThunk<
  void,
  void
>('auth/logout', async () => {
  const {refreshToken} = getAuthTokens();
  const {resp, data} = await fetchJson(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    body: {token: refreshToken}
  });
  if (!resp.ok || !data.success) {
    throw new Error("authLogout: unexpected error");
  }
  setAuthTokens({accessToken: undefined, refreshToken: undefined});
});


export const authResetPassword = createAsyncThunk<
  void,
  { email: string }
>('auth/resetPassword', async ({email}) => {
  const {resp, data} = await fetchJson(`${API_BASE_URL}/password-reset`, {
    method: "POST",
    body: {email: email}
  });
  if (!resp.ok || !data.success) {
    throw new Error("authResetPassword: unable to reset password");
  }
});

export const authSetNewPassword = createAsyncThunk<
  void,
  { token: string, password: string }
>('auth/setNewPassword', async ({token, password}) => {
  const {resp, data} = await fetchJson(`${API_BASE_URL}/password-reset/reset`, {
    method: "POST",
    body: {token, password}
  });
  if (!resp.ok || !data.success) {
    throw new Error("authSetNewPassword: unable to reset password");
  }
});

export const authRegister = createAsyncThunk<
  {
    accessToken: string,
    refreshToken: string,
    user: { name: string, email: string }
  },
  { name: string, email: string, password: string }
>('auth/register', async ({name, email, password}) => {
  const {resp, data} = await fetchJson(`${API_BASE_URL}/password-reset`, {
    method: "POST",
    body: {name, email, password}
  });
  if (!resp.ok || !data.success) {
    throw new Error("authRegister: unable to reset password");
  }
  setAuthTokens(data);
  return data;
});

export const authUpdateUser = createAsyncThunk<
  {
    user: { name: string, email: string }
  },
  {
    email: string,
    name: string,
    password?: string
  }
>('auth/updateUser', async ({ email, name, password}) => {
  const body: { email: string, name: string, password?: string } = {
    email: email,
    name: name
  };
  if (password) {
    body.password = password
  }
  const {resp, data} = await fetchJsonWithAuth(`${API_BASE_URL}/auth/user`, {
    method: "PATCH",
    body: body
  });
  if (!resp.ok || !data.success) {
    throw new Error("authUpdateUser: unexpected error");
  }
  return data
})