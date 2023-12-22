import styles from './modal-ingredient-details.module.css'
import PropTypes from "prop-types";

function ModalIngredientDetails({imgUrl, name, fat, proteins, carbohydrates, calories}) {
  return (
    <div className={styles.detailsMainContent}>
      <img src={imgUrl} alt={name}/>
      <div className={`${styles.subHeader} text text_type_main-medium pt-4 pb-8`}>{name}</div>
      <div className={`${styles.nutritionPanel} pb-15`}>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive pr-5`}>Калории, ккал</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{calories}</p>
        </div>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive pr-5`}>Белки, г</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{proteins}</p>
        </div>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive pr-5`}>Жиры, г</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{fat}</p>
        </div>
        <div className={styles.nutritionValues}>
          <p className={`${styles.margin} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.margin} text text_type_digits-default text_color_inactive`}>{carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

ModalIngredientDetails.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number
}

export default ModalIngredientDetails