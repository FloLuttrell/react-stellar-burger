import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./menu-card.module.css";
import {useDrag} from "react-dnd";
import {useAppSelector} from "../../hooks";

export type MenuCardDragItem  = {
  _id: string
}

type MenuCardProps = {
  _id: string,
  name: string,
  price: number,
  imgUrl: string
}
export const MenuCard: React.FunctionComponent<MenuCardProps> = ({name, price, imgUrl, _id}) => {
  const {bun, mainsAndSauces} = useAppSelector((state) => state.currentBurgerIngredients
  );
  let count = 0;
  if (bun?._id === _id) {
    count = 1;
  } else {
    for (const item of mainsAndSauces) {
      if (item._id === _id) {
        count += 1;
      }
    }
  }
  const [{opacity}, dragRef] = useDrag(() => ({
      type: "MENU_CARD_ITEM",
      item: (): MenuCardDragItem => ({_id}),
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []);
  return (
    <div style={{opacity}} ref={dragRef} className={`${styles.cardContainer}`}>
      <img src={imgUrl} alt={name}/>
      {count > 0 && (
        <Counter count={count} size="default" extraClass="m-1"/>
      )}
      <div className="text text_type_digits-default pt-1 pb-1">{price} <CurrencyIcon type="primary"/></div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
}
