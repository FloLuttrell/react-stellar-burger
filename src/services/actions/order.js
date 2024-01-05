export const ORDER_INGREDIENTS_REQUEST = 'ORDER_INGREDIENTS_REQUEST';
export const ORDER_INGREDIENTS_SUCCESS = 'ORDER_INGREDIENTS_SUCCESS';
export const ORDER_INGREDIENTS_FAILURE = 'ORDER_INGREDIENTS_FAILURE';



export const orderIngredients = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ORDER_INGREDIENTS_REQUEST });
    try {
      const {currentBurgerIngredients} = getState()
      const totalIdx = [];
      for (const ingr of currentBurgerIngredients.mainsAndSauces) {
        totalIdx.push(ingr._id)
      }
      totalIdx.push(currentBurgerIngredients.bun._id, currentBurgerIngredients.bun._id);
      let requestBody ={ingredients: totalIdx}
      const resp = await fetch(`https://norma.nomoreparties.space/api/orders`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {"content-type": "application/json"}
      });
      const { order } = await resp.json();
      dispatch({ type: ORDER_INGREDIENTS_SUCCESS, orderNumber: order.number });
    } catch (err) {
      dispatch({ type: ORDER_INGREDIENTS_FAILURE, error: err });
    }
  }
}