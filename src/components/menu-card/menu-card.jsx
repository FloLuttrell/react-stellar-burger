import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './menu-card.module.css'
import PropTypes from "prop-types";

function MenuCard({name, price, imgUrl}) {
  return (
    <div className={`${styles.cardContainer}`}>
      <img src={imgUrl} alt={name}/>
      <Counter count={1} size="default" extraClass="m-1" />
      <div className="text text_type_digits-default pt-1 pb-1">{price} <CurrencyIcon type="primary" /></div>
      <p className='text text_type_main-default'>{name}</p>
    </div>
  );
}

MenuCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string
}

export default MenuCard;