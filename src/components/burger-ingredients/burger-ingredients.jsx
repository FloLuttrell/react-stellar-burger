import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import ModalOrderDetails from "../modal-order-details/modal-order-details";

function BurgerIngredients() {
  const [ingredients, setIngredients] = useState({buns: [], sauces: [], mains: []});
  const [modalOpened, setModalOpened] = useState(false);
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

  const mapIngredientToBurger = (items) => (
    <div className={styles.ingredientsList}>
      <ul className={`${styles.ingredientsListTop}`}>
        <li className={`pb-2 pl-8`}><ConstructorElement
          type="top"
          isLocked={true}
          text={items[0].name}
          price={items[0].price}
          thumbnail={items[0].image}
        />
        </li>
      </ul>
      <div className={`${styles.ingredientsListMiddle}`}>
      <ul className={`${styles.burgerScrollWrapper} custom-scroll`}>
        {items.map((item) => {

          return (
                <li key={item._id} className={`${styles.ingredientItem} pb-2 pt-2`}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={true}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
          );
        })}
      </ul>
      </div>
      <ul className={styles.ingredientsListBottom}>
        <li className={`pt-2 pl-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={items[0].name}
            price={items[0].price}
            thumbnail={items[0].image}
          />
        </li>
        <li>
          <div className={`${styles.finalPrice} pt-10 pb-10`}>
            <p className={`${styles.priceNumber} text text_type_digits-medium`}>676 <CurrencyIcon type="primary"/></p>
            <Button htmlType="button" type="primary" size="large" onClick={()=>(setModalOpened(true))}>Оформить заказ</Button>
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={styles.burgerIngredients}>
      <div className={"pt-25"}></div>
      {ingredients.mains.length > 0 && mapIngredientToBurger(ingredients.mains)}
      { modalOpened && (
        <Modal title={''} handleCloseBtnClick={()=>setModalOpened(false)}>
          <ModalOrderDetails imgUrl></ModalOrderDetails>
        </Modal>
      )}


    </div>
  );
}

export default BurgerIngredients;
