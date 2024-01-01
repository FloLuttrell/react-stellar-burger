import {ADD_BURGER_INGREDIENT, REMOVE_BURGER_INGREDIENT} from "../actions/currentBurgerIngredients";

const initialState = {
  bun: undefined,
  mainsAndSauces: [],
};

let itemId = 1;

export const currentBurgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      const ingr = {...action.ingredient};
      ingr.itemId = itemId++;
      if (ingr.type === "bun") {
        return {...state, bun: ingr};
      }
      const mainsAndSauces = [...state.mainsAndSauces, ingr];
      return {...state, mainsAndSauces};
    }
    case REMOVE_BURGER_INGREDIENT: {
      if (state.bun?.itemId ===  action.itemId) {
        return {...state, bun: undefined};
      }
      const mainsAndSauces = state.mainsAndSauces.filter((it) => {
        return it.itemId !== action.itemId
      })
      return {...state, mainsAndSauces};
    }
  }
  return state;

};