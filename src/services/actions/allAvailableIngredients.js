import {API_BASE_URL} from "../../utils/consts";
import {fetchJson} from "../../utils/functions";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILURE = "GET_INGREDIENTS_FAILURE";


export const getIngredients = () => {
  return async (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST});
    try {
      const {data} = await fetchJson(`${API_BASE_URL}/ingredients`);
      const newBuns = [];
      const newSauces = [];
      const newMains = [];
      for (const item of data.data) {
        if (item.type === "bun") {
          newBuns.push(item);
        }
        if (item.type === "sauce") {
          newSauces.push(item);
        }
        if (item.type === "main") {
          newMains.push(item);
        }
      }
      dispatch({type: GET_INGREDIENTS_SUCCESS, buns: newBuns, sauces: newSauces, mains: newMains});
    } catch (err) {
      dispatch({type: GET_INGREDIENTS_FAILURE, error: err});
    }
  };
};