import reducer, {authInitialState} from './auth'
import {authLogin, authRefreshToken} from "../actions/auth";

describe("auth reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual(authInitialState)
  })
  it("set pending with authRefreshToken action", () => {
    expect(reducer(undefined, {type: authRefreshToken.pending.type})).toEqual({
      tokens: {
        pending: true,
        accessToken: undefined,
        refreshToken: undefined,
      },
      user: {
        pending: false,
        email: "",
        name: ""
      }
    })
  })
  it("set tokens and user with authLogin action", () => {
    expect(reducer(undefined, {
      type: authLogin.fulfilled.type,
      payload: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        user: {name: "abc", email: "kek"}
      }
    })).toEqual({
      tokens: {
        pending: false,
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
      user: {
        pending: false,
        email: "kek",
        name: "abc"
      }
    })
  })
})