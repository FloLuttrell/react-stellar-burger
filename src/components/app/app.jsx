import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.content}>
          <div className={styles.contentPart}>
            <BurgerConstructor/>

          </div>
          <div className={`p-10`}>
          </div>
          <div className={styles.contentPart}>
            <BurgerIngredients/>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
