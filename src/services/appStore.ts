import authReducer from "./reducers/auth";
import allAvailableIngredientsReducer from "./reducers/allAvailableIngredients";
import orderReducer from "./reducers/order";
import currentBurgerIngredientsReducer from "./reducers/currentBurgerIngredients";
import {configureStore} from "@reduxjs/toolkit";


export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    allAvailableIngredients: allAvailableIngredientsReducer,
    currentBurgerIngredients: currentBurgerIngredientsReducer,
    order: orderReducer,
  },
})
export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch