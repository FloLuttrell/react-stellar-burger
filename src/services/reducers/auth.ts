import {createSlice} from "@reduxjs/toolkit";
import {authFetchUser, authLogin, authLogout, authRefreshToken, authRegister, authUpdateUser} from "../actions/auth";

export const BURGER_APP_REFRESH_TOKEN_KEY = "BURGER_APP_REFRESH_TOKEN_KEY";
export const BURGER_APP_ACCESS_TOKEN_KEY = "BURGER_APP_ACCESS_TOKEN_KEY";


type Auth = {
  tokens: {
    pending: boolean,
    accessToken?: string
    refreshToken?: string
  }
  user: {
    pending: boolean,
    email: string,
    name: string
  }
}

export const authInitialState: Auth = {
  tokens: {
    pending: false,
    accessToken: undefined,
    refreshToken: undefined,
  },
  user: {
    pending: false,
    email: "",
    name: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(authRefreshToken.pending, (state, action) => {
        state.tokens.pending = true;
        state.tokens.accessToken = undefined;
        state.tokens.accessToken = undefined;
      })
      .addCase(authRefreshToken.fulfilled, (state, action) => {
        state.tokens.pending = false;
        state.tokens.accessToken = action.payload.accessToken;
        state.tokens.refreshToken = action.payload.refreshToken;
      })
      .addCase(authRefreshToken.rejected, (state, action) => {
        state.tokens.pending = false;
        state.tokens.accessToken = undefined;
        state.tokens.refreshToken = undefined;
      })
      .addCase(authFetchUser.pending, (state, action) => {
        state.user.pending = true;
        state.user.name = ""
        state.user.email = ""
      })
      .addCase(authFetchUser.fulfilled, (state, action) => {
        state.user.pending = false;
        state.user.name = action.payload.name
        state.user.email = action.payload.email
      })
      .addCase(authFetchUser.rejected, (state, action) => {
        state.user.pending = false;
        state.user.name = ""
        state.user.email = ""
      })
      .addCase(authRegister.pending, (state, action) => {
        state.user.pending = true;
        state.user.name = ""
        state.user.email = ""
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.user.pending = false;
        state.user.name = action.payload.user.name
        state.user.email = action.payload.user.email;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.user.pending = false;
        state.user.name = ""
        state.user.email = ""
      })
      .addCase(authLogin.pending, (state, action) => {
        state.tokens = {pending: true, accessToken: undefined, refreshToken: undefined}
        state.user = {pending: true, email: '', name: ''}
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        const {accessToken, refreshToken, user} = action.payload;
        state.tokens = {pending: false, accessToken, refreshToken}
        state.user = {pending: false, email: user.email, name: user.name}
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.tokens.pending = false;
        state.user.pending = false;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.tokens = {pending: false, accessToken: undefined, refreshToken: undefined}
        state.user = {pending: false, email: '', name: ''}
      })
      .addCase(authUpdateUser.pending, (state, action) => {
        state.user.pending = true;
      })
      .addCase(authUpdateUser.fulfilled, (state, action) => {
        state.user.pending = false;
        state.user.name = action.payload.user.name
        state.user.email = action.payload.user.email;
      })
      .addCase(authUpdateUser.rejected, (state, action) => {
        state.user.pending = false;
      })
  }
})

export const {} = authSlice.actions;
export default authSlice.reducer;