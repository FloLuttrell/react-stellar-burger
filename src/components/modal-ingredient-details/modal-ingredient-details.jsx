import styles from "./modal-ingredient-details.module.css";
import {useSelector} from "react-redux";

function ModalIngredientDetails() {
  const {ingredient} = useSelector((state) => {
    return (
      state.selectedIngredient
    );
  });
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
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

ModalIngredientDetails.propTypes = {

};

export default ModalIngredientDetails;