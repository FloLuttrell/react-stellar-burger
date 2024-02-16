import reducer, {resetAuth, setAuthPending, setUser} from './auth'

describe("auth reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual({
      pending: true,
      user: { name: "", email: ""}
    })
  })
  it("set pending with setAuthPending action", () => {
    expect(reducer(undefined, setAuthPending(true))).toEqual({
      pending: true,
      user: { name: "", email: ""}
    })
  })
  it("set user with setUser action", () => {
    expect(reducer(undefined, setUser({ name: "abc", email: "kek"}))).toEqual({
      pending: true,
      user: { name: "abc", email: "kek"}
    })
  })
  it("reset user with resetAuth action", () => {
    expect(reducer(undefined, resetAuth())).toEqual({
      pending: true,
      user: { name: "", email: ""}
    })
  })
})