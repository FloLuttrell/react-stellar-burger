export const SELECT_INGREDIENT_FOR_MODAL = 'SELECT_INGREDIENT_FOR_MODAL'
export const UNSELECT_INGREDIENT_FOR_MODAL = 'UNSELECT_INGREDIENT_FOR_MODAL'
export const selectIngredient = (ingredientId) => {
  return (dispatch, getState)=>{
    console.log("ingredientId")
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
      dispatch({ type: SELECT_INGREDIENT_FOR_MODAL, ingredient: found })
    }
  }
}

export const unselectIngredient = () => {
  return (dispatch) => {
    dispatch({ type: UNSELECT_INGREDIENT_FOR_MODAL })
  }
}