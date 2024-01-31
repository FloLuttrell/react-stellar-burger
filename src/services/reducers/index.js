import {combineReducers} from "redux";
import {orderReducer} from "./order";
import {allAvailableIngredientsReducer} from "./allAvailableIngredients";
import {currentBurgerIngredientsReducer} from "./currentBurgerIngredients";
import {authReducer} from "./auth";


export const rootReducer = combineReducers({
  order: orderReducer,
  allAvailableIngredients: allAvailableIngredientsReducer,
  currentBurgerIngredients: currentBurgerIngredientsReducer,
  auth: authReducer,
});
