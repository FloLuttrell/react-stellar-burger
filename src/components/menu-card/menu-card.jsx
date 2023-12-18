import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './menu-card.module.css'

function MenuCard({name, price, imgUrl}) {
  return (
    <div className={styles.cardContainer}>
      <img src={imgUrl} />
      <Counter count={1} size="default" extraClass="m-1" />
      <div className="text text_type_digits-default">{price} <CurrencyIcon type="primary" /></div>
      <p className='text text_type_main-default'>{name}</p>
    </div>
  );
}

export default MenuCard;