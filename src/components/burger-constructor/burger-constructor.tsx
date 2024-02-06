import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "./burger-constructor.module.css";
import {useDrop} from "react-dnd";
import {sendOrder} from "../../services/actions/order";
import {getAuthTokens} from "../../utils/functions";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {findIngredientById} from "../../services/reducers/allAvailableIngredients";
import {addBurgerIngredient} from "../../services/reducers/currentBurgerIngredients";
import {BurgerConstructorItem} from "../burger-constructor-item/burger-constructor-item";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import {MenuCardDragItem} from "../menu-card/menu-card";

export const BurgerConstructor: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const allAvailableIngredients = useAppSelector(store => store.allAvailableIngredients);
  const currentBurgerIngredients = useAppSelector(store => store.currentBurgerIngredients);
  const [, dropRef] = useDrop(
    () => ({
      accept: "MENU_CARD_ITEM",
      drop: (dropItem: MenuCardDragItem) => {
        const ing = findIngredientById(allAvailableIngredients, dropItem._id);
        if (ing) {
          dispatch(addBurgerIngredient(ing));
        }
      }
    }),
    []
  );


  return (
    <div className={`${styles.burgerIngredients} pl-4`}>
      <div className={"pt-25"}></div>
      <div ref={dropRef} className={styles.ingredientsList}>
        <ul className={`${styles.ingredientsListTop}`}>
          {currentBurgerIngredients.bun && (
            <li className={`pb-2 pl-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={currentBurgerIngredients.bun.name + " (верх)"}
                price={currentBurgerIngredients.bun.price}
                thumbnail={currentBurgerIngredients.bun.image}
              />
            </li>
          )}
        </ul>
        <div className={`${styles.ingredientsListMiddle}`}>
          <ul className={`${styles.burgerScrollWrapper} custom-scroll`}>
            {currentBurgerIngredients.mainsAndSauces.map((item) => {
              return (
                <li key={item.itemId} className={`pb-2 pt-2`}>
                  <BurgerConstructorItem item={item}></BurgerConstructorItem>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className={styles.ingredientsListBottom}>
          {currentBurgerIngredients.bun && (
            <li className={`pt-2 pl-8`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={currentBurgerIngredients.bun.name + " (низ)"}
                price={currentBurgerIngredients.bun.price}
                thumbnail={currentBurgerIngredients.bun.image}
              />
            </li>
          )}
          <li>
            <div className={`${styles.finalPrice} pt-10 pb-10`}>
              <p className={`${styles.priceNumber} text text_type_digits-medium`}>{currentBurgerIngredients.totalPrice}
                <CurrencyIcon type="primary"/></p>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                disabled={!currentBurgerIngredients.bun}
                onClick={() => {
                  const {accessToken} = getAuthTokens();
                  if (accessToken) {
                    setModalOpened(true);
                    dispatch(sendOrder());
                  } else {
                    navigate("/login")
                  }
                }}
              >
                Оформить заказ
              </Button>
            </div>
          </li>
        </ul>
      </div>
      {modalOpened && (
        <Modal title={""} onClose={() => setModalOpened(false)}>
          <OrderDetails/>
        </Modal>
      )}
    </div>
  );
}

