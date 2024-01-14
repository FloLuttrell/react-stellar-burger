import {API_BASE_URL} from "../../utils/consts";
import {request} from "../../utils/functions";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILURE = "SEND_ORDER_FAILURE";


export const sendOrder = () => {
  return async (dispatch, getState) => {
    dispatch({type: SEND_ORDER_REQUEST});
    try {
      const {currentBurgerIngredients} = getState();
      const totalIdx = [];
      for (const ingr of currentBurgerIngredients.mainsAndSauces) {
        totalIdx.push(ingr._id);
      }
      totalIdx.push(currentBurgerIngredients.bun._id, currentBurgerIngredients.bun._id);
      const requestBody = {ingredients: totalIdx};
      const {order} = await request(`${API_BASE_URL}/orders`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {"content-type": "application/json"}
      });
      dispatch({type: SEND_ORDER_SUCCESS, orderNumber: order.number});
    } catch (err) {
      dispatch({type: SEND_ORDER_FAILURE, error: err});
    }
  };
};