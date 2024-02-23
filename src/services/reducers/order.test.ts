import reducer, {sendOrderRequest, sendOrderSuccess, sendOrderFailure, orderInitialState} from './order'

describe("order reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual(orderInitialState)
  })
  it("set loading with sendOrderRequest action", () => {
    expect(reducer(undefined, sendOrderRequest())).toEqual({
      data: undefined,
      error: undefined,
      isLoading: true
    })
  })
  it("set data with sendOrderSuccess action", () => {
    expect(reducer(undefined, sendOrderSuccess("asd"))).toEqual({
      data: { orderNumber: "asd" },
      error: undefined,
      isLoading: false
    })
  })
  it("set error with sendOrderFailure action", () => {
    expect(reducer(undefined, sendOrderFailure(new Error("kek")))).toEqual({
      data: undefined,
      error: new Error("kek"),
      isLoading: false
    })
  })
})