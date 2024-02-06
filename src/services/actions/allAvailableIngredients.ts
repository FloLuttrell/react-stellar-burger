import {API_BASE_URL} from "../../utils/consts";
import {fetchJson} from "../../utils/functions";
import {getIngredientsFailure, getIngredientsRequest, getIngredientsSuccess} from "../reducers/allAvailableIngredients";
import {AppDispatch} from "../appStore";



export const getIngredients = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
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
      dispatch(getIngredientsSuccess({buns: newBuns, sauces: newSauces, mains: newMains}));
    } catch (err: any) {
      dispatch(getIngredientsFailure(err));
    }
  };
};