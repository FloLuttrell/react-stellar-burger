import {AUTH_RESET, AUTH_SET_USER} from "../actions/auth";

export const BURGER_APP_REFRESH_TOKEN_KEY = "BURGER_APP_REFRESH_TOKEN_KEY";
export const BURGER_APP_ACCESS_TOKEN_KEY = "BURGER_APP_ACCESS_TOKEN_KEY";

const initialState = {
  user: {
    email: "",
    name: "",
  },
};


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_RESET:
      return {...initialState};
    case AUTH_SET_USER: {
      const {email, name} = action.payload;
      return {...state, user: {email, name}};
    }
    default:
      return state;
  }
};