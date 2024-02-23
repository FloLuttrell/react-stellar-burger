import authReducer from "./reducers/auth";
import allAvailableIngredientsReducer from "./reducers/allAvailableIngredients";
import orderReducer from "./reducers/order";
import orderFeedReducer from "./reducers/orderFeed";
import currentBurgerIngredientsReducer from "./reducers/currentBurgerIngredients";
import {configureStore} from "@reduxjs/toolkit";
import {socketMiddleware} from "./socketMiddleware";


export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    allAvailableIngredients: allAvailableIngredientsReducer,
    currentBurgerIngredients: currentBurgerIngredientsReducer,
    order: orderReducer,
    orderFeed: orderFeedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware("")),
})
export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch