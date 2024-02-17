import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {Ingredient} from "./allAvailableIngredients";

export type IngredientSelected = Ingredient & {
  itemId: string,
}

export type CurrentBurgerIngredients = {
  bun?: IngredientSelected,
  mainsAndSauces: IngredientSelected[],
  totalPrice: number
}

export const currentBurgerIngredientsInitialState: CurrentBurgerIngredients = {
  bun: undefined,
  mainsAndSauces: [],
  totalPrice: 0,
};

let itemId = 1;

const calculateTotalPrice = (ingredients: (Ingredient | undefined)[]) => {
  let totalPrice = 0;
  for (const item of ingredients) {
    if (item) {
      totalPrice = totalPrice + item.price;
    }
  }
  return totalPrice;
};

const currentBurgerIngredientsSlice = createSlice({
  name: "currentBurgerIngredients",
  initialState: currentBurgerIngredientsInitialState,
  reducers: {
    addBurgerIngredient(state, action: PayloadAction<Ingredient>) {
      const ingr: IngredientSelected  = {
        ...action.payload,
        itemId: `${itemId++}`
      };
      if (ingr.type === "bun") {
        state.bun = ingr;
      } else {
        state.mainsAndSauces.push(ingr);
      }
      state.totalPrice = calculateTotalPrice([...state.mainsAndSauces, state.bun, state.bun]);
    },
    removeBurgerIngredient(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      if (state.bun?.itemId === itemId) {
        state.bun = undefined;
      } else {
        state.mainsAndSauces = state.mainsAndSauces.filter((it) => {
          return it.itemId !== itemId
        })
      }
      state.totalPrice = calculateTotalPrice([...state.mainsAndSauces, state.bun, state.bun]);
    },
    moveBurgerIngredient(state, action: PayloadAction<{srcItemId: string, targetItemId: string}>) {
      const {srcItemId, targetItemId} = action.payload;
      if (srcItemId === targetItemId) {
        return;
      }
      const {mainsAndSauces} = state
      const sourceIdx = mainsAndSauces.findIndex((i) => i.itemId === srcItemId);
      const targetIdx = mainsAndSauces.findIndex((i) => i.itemId === targetItemId);
      const sourceItem = mainsAndSauces[sourceIdx];
      if (sourceIdx < targetIdx) {
        // после таргета
        mainsAndSauces.splice(targetIdx + 1, 0, sourceItem);
        mainsAndSauces.splice(sourceIdx, 1);
      } else {
        // перед таргетом
        mainsAndSauces.splice(targetIdx, 0, sourceItem);
        mainsAndSauces.splice(sourceIdx + 1, 1);
      }
    }
  }
});

export const {
  addBurgerIngredient,
  removeBurgerIngredient,
  moveBurgerIngredient
} = currentBurgerIngredientsSlice.actions;
export default currentBurgerIngredientsSlice.reducer;