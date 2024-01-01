export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE';



export const getIngredients = () => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    try {
      const resp = await fetch(`https://norma.nomoreparties.space/api/ingredients`);
      const {data} = await resp.json();
      const newBuns = [];
      const newSauces = [];
      const newMains = [];
      for (const item of data) {
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
      dispatch({ type: GET_INGREDIENTS_SUCCESS,  buns: newBuns, sauces: newSauces, mains: newMains });
    } catch (err) {
      dispatch({ type: GET_INGREDIENTS_FAILURE, error: err });
    }
  }
}