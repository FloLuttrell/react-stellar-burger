import styles from "./ingredient.module.css"
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";

export const IngredientPage: React.FunctionComponent = () => {
  return (
    <div className={styles.detailsContent}>
      <IngredientDetails/>
    </div>
  );
};