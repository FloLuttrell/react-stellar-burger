import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"

function App() {
  return (
    <div className={styles.app}>
      <AppHeader></AppHeader>
      <div className={styles.content}>
        <div className={styles.contentPart}>
          <BurgerConstructor>
          </BurgerConstructor>

        </div>
        <div className={`p-10`}>
        </div>
        <div className={styles.contentPart}>
          <BurgerIngredients>
          </BurgerIngredients>
        </div>
      </div>
    </div>
  );
}

export default App;
