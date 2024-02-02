
import styles from "./ingredient.module.css"
import {AppHeader} from "../../components/app-header/app-header";
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";

export const IngredientPage: React.FunctionComponent = () => {
  return (
    <div>
      <AppHeader/>
      <div className={styles.detailsContent}>
        <IngredientDetails/>
      </div>
    </div>
  );
};