import AppHeader from "../../components/app-header/app-header";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css"
export const IngredientPage = () => {
  return (
    <div>
      <AppHeader></AppHeader>
      <div className={styles.detailsContent}>
        <IngredientDetails></IngredientDetails>
      </div>
    </div>
  );
};