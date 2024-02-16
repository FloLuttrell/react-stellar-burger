import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Ingredient = {
  _id: string,
  type: string,
  name: string,
  price: number,
  image: string,
  image_large: string,
  calories: string,
  proteins: string,
  fat: string,
  carbohydrates: string
}

type AllAvailableIngredients = {
  isLoading: boolean,
  data?: {
    buns: Ingredient[],
    sauces: Ingredient[],
    mains: Ingredient[]
  },
  error: any
}

export const findIngredientById = (state: AllAvailableIngredients, ingredientId: string) => {
  const buns = state.data?.buns ?? [];
  const sauces = state.data?.sauces ?? [];
  const mains = state.data?.mains ?? [];
  const bun = buns.find(b => b._id === ingredientId);
  const sauce = sauces.find(b => b._id === ingredientId);
  const main = mains.find(b => b._id === ingredientId);
  return bun || sauce || main
}


const allAvailableIngredientsInitialState : AllAvailableIngredients = {
  isLoading: false,
  data: undefined,
  error: undefined
};

export const allAvailableIngredientsSlice = createSlice({
  name: "allAvailableIngredients",
  initialState: allAvailableIngredientsInitialState,
  reducers: {
    getIngredientsRequest(state) {
      state.isLoading = true;
      state.data = undefined;
      state.error = undefined;
    },
    getIngredientsSuccess(state, action: PayloadAction<NonNullable<AllAvailableIngredients["data"]>>) {
      const {buns, sauces, mains} = action.payload;
      state.isLoading = false;
      state.error = undefined;
      state.data = {buns, sauces, mains};
    },
    getIngredientsFailure(state , action: PayloadAction<Error>) {
      const error = action.payload;
      state.isLoading = false;
      state.error = error;
      state.data = undefined;
    }
  }
});

export const { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailure } = allAvailableIngredientsSlice.actions

export default allAvailableIngredientsSlice.reducer