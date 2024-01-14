import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./menu-card.module.css";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";


function MenuCard({name, price, imgUrl, _id}) {
  const {bun, mainsAndSauces} = useSelector((state) => {
    return state.currentBurgerIngredients;
  });
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
      item: {_id},
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

MenuCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
  _id: PropTypes.string.isRequired
};

export default MenuCard;