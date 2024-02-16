import reducer, { sendOrderRequest, sendOrderSuccess, sendOrderFailure} from './order'

describe("order reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual({
      data: undefined,
      error: undefined,
      isLoading: false
    })
  })
  it("set loading with getIngredientsRequest action", () => {
    expect(reducer(undefined, sendOrderRequest())).toEqual({
      data: undefined,
      error: undefined,
      isLoading: true
    })
  })
  it("set data with getIngredientsSuccess action", () => {
    expect(reducer(undefined, sendOrderSuccess("asd"))).toEqual({
      data: { orderNumber: "asd" },
      error: undefined,
      isLoading: false
    })
  })
  it("set error with getIngredientsFailure action", () => {
    expect(reducer(undefined, sendOrderFailure(new Error("kek")))).toEqual({
      data: undefined,
      error: new Error("kek"),
      isLoading: false
    })
  })
})