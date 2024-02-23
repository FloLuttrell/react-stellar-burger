import reducer, {
  addBurgerIngredient,
  CurrentBurgerIngredients, currentBurgerIngredientsInitialState,
  IngredientSelected,
  moveBurgerIngredient,
  removeBurgerIngredient
} from './currentBurgerIngredients'

const makeFakeIngredient = (opt: Partial<IngredientSelected>) => (opt as IngredientSelected)

describe("currentBurgerIngredients reducer should work", () => {
  it("initiate state properly", () => {
    expect(reducer(undefined, {} as any)).toEqual(currentBurgerIngredientsInitialState)
  })
  it("add bun with addBurgerIngredient action", () => {
    const bun = makeFakeIngredient({_id: "1", type: "bun", price: 1})
    expect(reducer(undefined, addBurgerIngredient(bun))).toMatchObject({
      bun: bun,
      mainsAndSauces: [],
      totalPrice: 2
    })
  })
  it("replace bun with addBurgerIngredient action", () => {
    const bun1 = makeFakeIngredient({_id: "1", type: "bun", price: 1})
    const state: CurrentBurgerIngredients = {
      bun: bun1,
      mainsAndSauces: [],
      totalPrice: 0
    }
    const bun2 = makeFakeIngredient({_id: "1", type: "bun", price: 1})
    expect(reducer(state, addBurgerIngredient(bun2))).toMatchObject({
      bun: bun2,
      mainsAndSauces: [],
      totalPrice: 2
    })
  })
  it("add sauce with addBurgerIngredient action", () => {
    const sauce = makeFakeIngredient({_id: "1", type: "sauce", price: 3})
    expect(reducer(undefined, addBurgerIngredient(sauce))).toMatchObject({
      bun: undefined,
      mainsAndSauces: [sauce],
      totalPrice: 3
    })
  })
  it("remove ingredient with removeBurgerIngredient action", () => {
    const bun1 = makeFakeIngredient({_id: "1", itemId: "i1", type: "bun", price: 1})
    const sauce1 = makeFakeIngredient({_id: "1", itemId: "i2", type: "sauce", price: 1})
    const sauce2 = makeFakeIngredient({_id: "1", itemId: "i3", type: "sauce", price: 1})
    const state: CurrentBurgerIngredients = {
      bun: bun1,
      mainsAndSauces: [sauce1, sauce2],
      totalPrice: 4
    }
    expect(reducer(state, removeBurgerIngredient("i2"))).toMatchObject({
      bun: bun1,
      mainsAndSauces: [sauce2],
      totalPrice: 3
    })
  })
  it("move ingredient with moveBurgerIngredient action", () => {
    const sauce1 = makeFakeIngredient({_id: "1", itemId: "i1", type: "sauce", price: 1})
    const sauce2 = makeFakeIngredient({_id: "1", itemId: "i2", type: "sauce", price: 1})
    const sauce3 = makeFakeIngredient({_id: "1", itemId: "i3", type: "sauce", price: 1})
    const state: CurrentBurgerIngredients = {
      bun: undefined,
      mainsAndSauces: [sauce1, sauce2, sauce3],
      totalPrice: 3
    }
    expect(reducer(state, moveBurgerIngredient({srcItemId: "i2", targetItemId: "i1"}))).toMatchObject({
      bun: undefined,
      mainsAndSauces: [sauce2, sauce1, sauce3],
      totalPrice: 3
    })
    expect(reducer(state, moveBurgerIngredient({srcItemId: "i2", targetItemId: "i3"}))).toMatchObject({
      bun: undefined,
      mainsAndSauces: [sauce1, sauce3, sauce2],
      totalPrice: 3
    })
  })
})