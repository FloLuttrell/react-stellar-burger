import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const BURGER_APP_REFRESH_TOKEN_KEY = "BURGER_APP_REFRESH_TOKEN_KEY";
export const BURGER_APP_ACCESS_TOKEN_KEY = "BURGER_APP_ACCESS_TOKEN_KEY";


type Auth = {
  pending: boolean,
  user: {
    email: string,
    name: string
  }
}

const authInitialState: Auth = {
  pending: true,
  user: {
    email: "",
    name: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setAuthPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload;
    },
    setUser(state, action: PayloadAction<Auth["user"]>) {
      const {email, name} = action.payload;
      state.user = {email, name}
    },
    resetAuth(state) {
      state.user = { name: "", email: ""}
    }
  }
})

export const { setUser, resetAuth, setAuthPending} = authSlice.actions;
export default authSlice.reducer;