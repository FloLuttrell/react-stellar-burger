import styles from "./home.module.css";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients";

export const HomePage: React.FunctionComponent = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <main className={styles.content}>
          <div className={styles.contentPart}>
            <BurgerIngredients/>
          </div>
          <div className={`p-10`}>
          </div>
          <div className={styles.contentPart}>
            <BurgerConstructor/>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

