import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const BURGER_APP_REFRESH_TOKEN_KEY = "BURGER_APP_REFRESH_TOKEN_KEY";
export const BURGER_APP_ACCESS_TOKEN_KEY = "BURGER_APP_ACCESS_TOKEN_KEY";


type Auth = {
  user: {
    email: string,
    name: string
  }
}

const authInitialState: Auth = {
  user: {
    email: "",
    name: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUser(state, action: PayloadAction<Auth["user"]>) {
      const {email, name} = action.payload;
      state.user = {email, name}
    },
    resetAuth(state) {
      state.user = { name: "", email: ""}
    }
  }
})

export const { setUser, resetAuth} = authSlice.actions;
export default authSlice.reducer;