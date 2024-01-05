import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect, useRef, useState} from "react";
import MenuCard from "../menu-card/menu-card";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import ModalIngredientDetails from "../modal-ingredient-details/modal-ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {selectIngredient, unselectIngredient} from "../../services/actions/selectedIngredient";
import {getIngredients} from "../../services/actions/allAvailableIngredients";

function BurgerConstructor() {
  const [current, setCurrent] = useState("buns");
  const dispatch = useDispatch();

  const selectedIngredient = useSelector((state) => {
    return (
      state.selectedIngredient.ingredient
    );
  });

  const ingredientsData = useSelector(state => state.allAvailableIngredients);

  useEffect(async () => {
    dispatch(getIngredients());
  }, []);

  const scrollAreaRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const handleIngredientListScroll = useCallback(() => {
    const scrollRect = scrollAreaRef.current.getBoundingClientRect();
    const bunRect = bunRef.current.getBoundingClientRect();
    const sauceRect = sauceRef.current.getBoundingClientRect();
    const mainRect = mainRef.current.getBoundingClientRect();
    const bunDistance = Math.abs(scrollRect.top - bunRect.top);
    const sauceDistance = Math.abs(scrollRect.top - sauceRect.top);
    const mainDistance = Math.abs(scrollRect.top - mainRect.top);
    const tabByDistnce = {
      [bunDistance]: "buns",
      [sauceDistance]: "sauces",
      [mainDistance]: "fillings"
    };
    const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
    setCurrent(tabByDistnce[minDistance])
  }, [])


  const ingredients = ingredientsData.data ?? {buns: [], sauces: [], mains: []};
  const mapIngredientToMenuCard = (items) => (
    <ul className={`${styles.ingredientsList} pt-6 pr-4 pb-10 pl-4`}>
      {items.map((item) => (
        <li key={item._id} className={styles.ingredientItem}>
          <div onClick={() => {
            dispatch(selectIngredient(item._id));

          }}>
            <MenuCard _id={item._id} name={item.name} price={item.price} imgUrl={item.image}></MenuCard>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.content}>
      <div className="asdasd"></div>
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
        <div ref={scrollAreaRef} className={`${styles.scrollWrapper} custom-scroll`} onScroll={handleIngredientListScroll}>
          <h2 ref={bunRef} className="text text_type_main-medium mb-6">Булки</h2>
          {mapIngredientToMenuCard(ingredients.buns)}
          <h2 ref={sauceRef} className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          {mapIngredientToMenuCard(ingredients.sauces)}
          <h2 ref={mainRef} className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          {mapIngredientToMenuCard(ingredients.mains)}
        </div>
      </div>
      {selectedIngredient && (
        <Modal title={"Детали ингридиента"} handleCloseBtnClick={() => dispatch(unselectIngredient())}>
          <ModalIngredientDetails></ModalIngredientDetails>
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
