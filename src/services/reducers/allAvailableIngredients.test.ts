import reducer, {
  getIngredientsRequest,
  getIngredientsFailure,
  getIngredientsSuccess,
  allAvailableIngredientsInitialState
} from './allAvailableIngredients'

describe("allAvailableIngredients reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual(allAvailableIngredientsInitialState)
  })

 it("set loading with getIngredientsRequest action", () => {
   expect(reducer(undefined, getIngredientsRequest())).toEqual({
     data: undefined,
     error: undefined,
     isLoading: true
   })
 })
  it("set error with getIngredientsFailure action", () => {
    expect(reducer(undefined, getIngredientsFailure(new Error("kek")))).toEqual({
      data: undefined,
      error: new Error("kek"),
      isLoading: false
    })
  })
  it("set data with getIngredientsSuccess action", () => {
    expect(reducer(undefined, getIngredientsSuccess({ mains: [], sauces: [], buns: []}))).toEqual({
      data: { mains: [], sauces: [], buns: []},
      error: undefined,
      isLoading: false
    })
  })
})