import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useRef, useState} from "react";
import styles from "./burger-ingredients.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {Ingredient} from "../../services/reducers/allAvailableIngredients";
import {MenuCard} from "../menu-card/menu-card";

export const BurgerIngredients: React.FunctionComponent = () => {
  const [current, setCurrent] = useState("buns");

  const ingredientsData = useAppSelector(state => state.allAvailableIngredients);
  const ingredients = ingredientsData.data ?? {buns: [], sauces: [], mains: []};

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const handleIngredientListScroll = useCallback(() => {
    const scrollRect = scrollAreaRef.current?.getBoundingClientRect();
    const bunRect = bunRef.current?.getBoundingClientRect();
    const sauceRect = sauceRef.current?.getBoundingClientRect();
    const mainRect = mainRef.current?.getBoundingClientRect();
    if (scrollRect && bunRect && sauceRect && mainRect) {
      const bunDistance = Math.abs(scrollRect.top - bunRect.top);
      const sauceDistance = Math.abs(scrollRect.top - sauceRect.top);
      const mainDistance = Math.abs(scrollRect.top - mainRect.top);
      const tabByDistnce = {
        [bunDistance]: "buns",
        [sauceDistance]: "sauces",
        [mainDistance]: "fillings"
      };
      const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
      setCurrent(tabByDistnce[minDistance]);
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const mapIngredientToMenuCard = (items: Ingredient[]) => (
    <ul className={`${styles.ingredientsList} pt-6 pr-4 pb-10 pl-4`}>
      {items.map((item) => (
        <li key={item._id} className={styles.ingredientItem}>
          <div onClick={() => {
            navigate(`/ingredients/${item._id}`, {state: {backgroundLocation: location}});
          }}>
            <MenuCard _id={item._id} name={item.name} price={item.price} imgUrl={item.image}></MenuCard>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.content}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.ingredientTypes} pb-10`}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="fillings" active={current === "fillings"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredientItems}`}>
        <div ref={scrollAreaRef} className={`${styles.scrollWrapper} custom-scroll`}
             onScroll={handleIngredientListScroll}>
          <h2 ref={bunRef} className="text text_type_main-medium mb-6">Булки</h2>
          {mapIngredientToMenuCard(ingredients.buns)}
          <h2 ref={sauceRef} className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          {mapIngredientToMenuCard(ingredients.sauces)}
          <h2 ref={mainRef} className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          {mapIngredientToMenuCard(ingredients.mains)}
        </div>
      </div>
    </div>
  );
}
