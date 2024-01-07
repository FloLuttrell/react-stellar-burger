import {combineReducers} from "redux";
import {orderReducer} from "./order";
import {allAvailableIngredientsReducer} from "./allAvailableIngredients";
import {currentBurgerIngredientsReducer} from "./currentBurgerIngredients";
import {selectedIngredientReducer} from "./selectedIngredient";

export const rootReducer = combineReducers({
  order: orderReducer,
  allAvailableIngredients: allAvailableIngredientsReducer,
  currentBurgerIngredients: currentBurgerIngredientsReducer,
  selectedIngredient: selectedIngredientReducer,
});
