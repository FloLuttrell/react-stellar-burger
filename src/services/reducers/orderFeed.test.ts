import reducer, {setFeedState} from './orderFeed'

describe("orderFeed reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual({
      orders: [],
      total: 0,
      totalToday: 0
    })
  })
  it("set loading with getIngredientsRequest action", () => {
    expect(reducer(undefined, setFeedState({orders: [], total: 123, totalToday: 1}))).toEqual({
      orders: [],
      total: 123,
      totalToday: 1
    })
  })
})