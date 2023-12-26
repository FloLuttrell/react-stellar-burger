import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import MenuCard from "../menu-card/menu-card";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import ModalIngredientDetails from "../modal-ingredient-details/modal-ingredient-details";

function BurgerConstructor() {
  const [current, setCurrent] = useState("buns");
  const [ingredients, setIngredients] = useState({buns: [], sauces: [], mains: []});
  const [modalIngredientOpened, setModalIngredientOpened] = useState('');

  useEffect(async () => {
    const resp = await fetch(`https://norma.nomoreparties.space/api/ingredients`);
    const {data} = await resp.json();
    const newBuns = [];
    const newSauces = [];
    const newMains = [];
    for (const item of data) {
      if (item.type === "bun") {
        newBuns.push(item);
      }
      if (item.type === "sauce") {
        newSauces.push(item);
      }
      if (item.type === "main") {
        newMains.push(item);
      }
    }
    setIngredients({buns: newBuns, sauces: newSauces, mains: newMains});
  }, []);

  const mapIngredientToMenuCard = (items) => (
    <ul className={`${styles.ingredientsList} pt-6 pr-4 pb-10 pl-4`}>
      {items.map((item) => (
        <li key={item._id} className={styles.ingredientItem}>
          <div onClick={()=>setModalIngredientOpened(item._id)}>
            <MenuCard name={item.name} price={item.price} imgUrl={item.image}></MenuCard>
          </div>
          { modalIngredientOpened === item._id && (
            <Modal title={'Детали ингридиента'} handleCloseBtnClick={()=>setModalIngredientOpened('')}>
              <ModalIngredientDetails calories={item.calories} carbohydrates={item.carbohydrates} fat={item.fat} proteins={item.proteins} name={item.name} imgUrl={item.image_large}></ModalIngredientDetails>
            </Modal>
          )}
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
        <div className={`${styles.scrollWrapper} custom-scroll`}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          {mapIngredientToMenuCard(ingredients.buns)}
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          {mapIngredientToMenuCard(ingredients.sauces)}
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          {mapIngredientToMenuCard(ingredients.mains)}
        </div>
      </div>

    </div>
  );
}

export default BurgerConstructor;
