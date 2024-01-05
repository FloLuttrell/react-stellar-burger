import {ORDER_INGREDIENTS_FAILURE, ORDER_INGREDIENTS_REQUEST, ORDER_INGREDIENTS_SUCCESS} from "../actions/order";

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_INGREDIENTS_REQUEST:
      return {...state, isLoading: true, data: undefined, error: undefined};
    case ORDER_INGREDIENTS_SUCCESS:
      const {orderNumber} = action
      return {...state, isLoading: false, data: {orderNumber}, error: undefined};
    case ORDER_INGREDIENTS_FAILURE:
      const {error} = action;
      return {...state, isLoading: false, data: undefined, error};
    default:
      return state;
  }
};