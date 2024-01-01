export const ADD_BURGER_INGREDIENT = "ADD_BURGER_INGREDIENT";
export const REMOVE_BURGER_INGREDIENT = "REMOVE_BURGER_INGREDIENT";

export const addBurgerIngredient = (ingredientId) => {
  return (dispatch, getState) => {
    const state = getState();
    const allAvailableIngredients = state.allAvailableIngredients;
    const buns = allAvailableIngredients.data?.buns ?? [];
    const sauces = allAvailableIngredients.data?.sauces ?? [];
    const mains = allAvailableIngredients.data?.mains ?? [];
    const bun = buns.find(b => b._id === ingredientId);
    const sauce = sauces.find(b => b._id === ingredientId);
    const main = mains.find(b => b._id === ingredientId);
    const found = bun || sauce || main;
    if (found) {
      dispatch({type: ADD_BURGER_INGREDIENT, ingredient: found});
    }
  };
};

export const removeBurgerIngredient = (itemId) => {
  return (dispatch) => {
    dispatch({type: REMOVE_BURGER_INGREDIENT, itemId})
  }
}