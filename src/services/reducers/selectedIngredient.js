import {SELECT_INGREDIENT_FOR_MODAL, UNSELECT_INGREDIENT_FOR_MODAL} from "../actions/selectedIngredient";


const initialState = {
  ingredient: undefined
};

export const selectedIngredientReducer = (state=initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT_FOR_MODAL:
      return {...state, ingredient: action.ingredient }
    case UNSELECT_INGREDIENT_FOR_MODAL:
      return {...state, ingredient: undefined }
  }
  return state;
}