import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./order-card.module.css";
import {useAppSelector} from "../../hooks";
import {Ingredient} from "../../services/reducers/allAvailableIngredients";
import {OrderItem} from "../../services/reducers/orderFeed";
import {orderStatusRu} from "../../utils/consts";

type OrderCardProps = {
  order: OrderItem,
  showOrderState?: boolean
}

export const OrderCard: React.FunctionComponent<OrderCardProps> = ({order, showOrderState}) => {
  const {data} = useAppSelector(store => store.allAvailableIngredients);
  const mixedIngredients: Ingredient[] = [];
  if (data) {
    mixedIngredients.push(...data.buns)
    mixedIngredients.push(...data.mains)
    mixedIngredients.push(...data.sauces)
  }

  const ingredients = new Set<Ingredient>();
  let orderPrice = 0;
  for (const ingredientId of order.ingredients) {
    const ingredient = mixedIngredients.find(mi => mi._id === ingredientId);
    if (ingredient) {
      ingredients.add(ingredient);
      orderPrice += ingredient.price;
    }
  }
  let orderStatusCls = '';
  if (order.status === 'done') {
    orderStatusCls = styles.blueNumbers
  }

  return (
    <div className={styles.card}>
      <li className={`pr-10 pl-10`}>
        <div className={`pt-6 ${styles.header}`}>
          <p className={`text text_type_digits-default`}>
            #{order.number}
          </p>
          <div className={`${styles.date}`}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order.updatedAt)}
            />
          </div>
        </div>
        {showOrderState && (
          <div className={`text text_type_main-small ${orderStatusCls}`}>{orderStatusRu[order.status]}</div>
        )}
        <h2 className={`text text_type_main-medium pt-6 ${styles.name}`}>
          {order.name}
        </h2>
        <div className={`pt-6 pb-6 ${styles.orderInfo}`}>
          <ul className={styles.ingredientImg}>
            {Array.from(ingredients).map(ingr => (
              <li key={ingr._id} className={`${styles.smallImgBorder}`}>
                <div className={styles.smallImgContainer}>
                  <img className={styles.smallImg} src={ingr.image} alt={ingr.name} />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.price}>
            <p className={"text text_type_digits-default"}>{orderPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </li>
    </div>
  )
}