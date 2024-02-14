import {API_BASE_URL} from "../../utils/consts";
import { fetchJsonWithAuth } from "../../utils/functions";
import {sendOrderFailure, sendOrderRequest, sendOrderSuccess} from "../reducers/order";
import {AppDispatch, RootState} from "../appStore";

export const sendOrder = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(sendOrderRequest());
    try {
      const {currentBurgerIngredients} = getState();
      const totalIdx = [];
      for (const ingr of currentBurgerIngredients.mainsAndSauces) {
        totalIdx.push(ingr._id);
      }
      if (currentBurgerIngredients.bun) {
        totalIdx.push(currentBurgerIngredients.bun._id, currentBurgerIngredients.bun._id);
      }
      const requestBody = {ingredients: totalIdx};
      const {data} = await fetchJsonWithAuth(`${API_BASE_URL}/orders`, {
        method: "POST",
        body: requestBody,
      });
      dispatch(sendOrderSuccess(data.order.number));
    } catch (err: any) {
      dispatch(sendOrderFailure(err));
    }
  };
};