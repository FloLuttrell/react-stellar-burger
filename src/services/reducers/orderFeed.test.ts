import reducer, {orderFeedInitialState, wsConnectionMessage} from './orderFeed'

describe("orderFeed reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual(orderFeedInitialState)
  })
  it("set loading with wsConnectionMessage action", () => {
    const data = JSON.stringify({
      success: true,
      orders: [],
      total: 123,
      totalToday: 1
    })
    expect(reducer(undefined, wsConnectionMessage(data))).toEqual({
      orders: [],
      total: 123,
      totalToday: 1
    })
  })
})