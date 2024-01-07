import {SEND_ORDER_FAILURE, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS} from "../actions/order";

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return {...state, isLoading: true, data: undefined, error: undefined};
    case SEND_ORDER_SUCCESS:
      const {orderNumber} = action
      return {...state, isLoading: false, data: {orderNumber}, error: undefined};
    case SEND_ORDER_FAILURE:
      const {error} = action;
      return {...state, isLoading: false, data: undefined, error};
    default:
      return state;
  }
};