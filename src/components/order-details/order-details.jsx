import styles from "./order-details.module.css";
import doneImg from "../../img/successIcon.svg";
import {useSelector} from "react-redux";

function OrderDetails() {
  const orderNumber = useSelector((state) => state.order.data?.orderNumber);
  return (
    <div className={styles.mainContent}>
      <p className={`${styles.glowNumbers} text_type_digits-large pt-4`}>{orderNumber}</p>
      <p className={`text text_type_main-medium pt-8`}>Идентификатор заказа</p>
      <img src={doneImg} alt={"done"} className="pt-15 pb-15"/>
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive pt-2 pb-30`}>Дождитесь готовности на орбитальной
        станции</p>
    </div>
  );
}

export default OrderDetails;