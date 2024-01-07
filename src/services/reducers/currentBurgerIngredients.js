import {
  ADD_BURGER_INGREDIENT,
  MOVE_BURGER_INGREDIENT,
  REMOVE_BURGER_INGREDIENT
} from "../actions/currentBurgerIngredients";

const initialState = {
  bun: undefined,
  mainsAndSauces: [],
  totalPrice: 0,
};

let itemId = 1;

export const currentBurgerIngredientsReducer = (state = initialState, action) => {
  const calculateTotalPrice = (ingredients) => {
    let totalPrice = 0;
    for (const item of ingredients) {
      if (item) {
        totalPrice = totalPrice + item.price;
      }
    }
    return totalPrice;
  };
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      const ingr = {...action.ingredient};
      ingr.itemId = itemId++;
      let newState = {...state};
      if (ingr.type === "bun") {
        newState = {...newState, bun: ingr};
      } else {
        const mainsAndSauces = [...state.mainsAndSauces, ingr];
        newState = {...newState, mainsAndSauces};
      }
      const totalPrice = calculateTotalPrice([...newState.mainsAndSauces, newState.bun, newState.bun]);
      return {...newState, totalPrice};
    }
    case REMOVE_BURGER_INGREDIENT: {
      let newState = {...state};
      if (newState.bun?.itemId === action.itemId) {
        newState = {...newState, bun: undefined};
      } else {
        const mainsAndSauces = newState.mainsAndSauces.filter((it) => {
          return it.itemId !== action.itemId;
        });
        newState = {...newState, mainsAndSauces};
      }
      const totalPrice = calculateTotalPrice([...newState.mainsAndSauces, newState.bun, newState.bun]);
      return {...newState, totalPrice};
    }
    case MOVE_BURGER_INGREDIENT: {
      const { srcItemId, targetItemId } = action;
      if (srcItemId === targetItemId) {
        return state;
      }
      const mainsAndSauces = [...state.mainsAndSauces]
      const sourceIdx = mainsAndSauces.findIndex((i) => i.itemId === srcItemId);
      const targetIdx = mainsAndSauces.findIndex((i) => i.itemId === targetItemId);
      const sourceItem = mainsAndSauces[sourceIdx];
      if (sourceIdx < targetIdx) {
        // после таргета
        mainsAndSauces.splice(targetIdx + 1, 0, sourceItem);
        mainsAndSauces.splice(sourceIdx, 1);
      } else  {
        // перед таргетом
        mainsAndSauces.splice(targetIdx, 0, sourceItem);
        mainsAndSauces.splice(sourceIdx+1, 1);
      }
      return {...state, mainsAndSauces };
    }
  }
  return state;

};