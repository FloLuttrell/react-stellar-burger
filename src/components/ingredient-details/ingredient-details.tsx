import styles from "./ingredient-details.module.css";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";

export const IngredientDetails: React.FunctionComponent = () => {
  const {id: ingredientId} = useParams();

  const ingredient = useAppSelector((state) => {
    const {allAvailableIngredients} = state;
    const buns = allAvailableIngredients.data?.buns ?? [];
    const sauces = allAvailableIngredients.data?.sauces ?? [];
    const mains = allAvailableIngredients.data?.mains ?? [];
    const bun = buns.find(b => b._id === ingredientId);
    const sauce = sauces.find(b => b._id === ingredientId);
    const main = mains.find(b => b._id === ingredientId);
    return bun || sauce || main;
  });

  if (!ingredient) {
    return (<div>...</div>);
  }

  return (
    <div className={styles.detailsMainContent}>
      <img src={ingredient.image_large} alt={ingredient.name}/>
      <div className={`${styles.subHeader} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</div>
      <div className={`${styles.nutritionPanel} pb-15`}>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive pr-5`}>Калории, ккал</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
        </div>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive pr-5`}>Белки, г</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
        </div>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive pr-5`}>Жиры, г</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
        </div>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p
            className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}