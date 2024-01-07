import {
  GET_INGREDIENTS_FAILURE,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from "../actions/allAvailableIngredients";

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

export const allAvailableIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {...state, isLoading: true, data: undefined, error: undefined };
    case GET_INGREDIENTS_SUCCESS:
      const {buns, sauces, mains} = action;
      return {...state, isLoading: false, data: {buns, sauces, mains}, error: undefined };
    case GET_INGREDIENTS_FAILURE:
      const { error } = action;
      return {...state, isLoading: false, data: undefined, error };
    default:
      return state;
  }
};