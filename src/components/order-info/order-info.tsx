import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import styles from '../order-info/order-info.module.css'
import {Ingredient} from "../../services/reducers/allAvailableIngredients";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {orderStatusRu} from "../../utils/consts";

export const OrderInfo: React.FunctionComponent = () => {
  const {orderId} = useParams();
  const {data} = useAppSelector(store => store.allAvailableIngredients);
  const order = useAppSelector(s => s.orderFeed.orders.find(o => o._id === orderId))
  if (!order) {
    return (
      <div>???</div>
    )
  }
  const mixedIngredients: Ingredient[] = [];
  if (data) {
    mixedIngredients.push(...data.buns)
    mixedIngredients.push(...data.mains)
    mixedIngredients.push(...data.sauces)
  }

  const ingredientById = new Map<string, { ingredient: Ingredient, quantity: number }>()
  let orderPrice = 0;
  for (const ingredientId of order.ingredients) {
    const ingredient = mixedIngredients.find(mi => mi._id === ingredientId);
    if (ingredient) {
      const orderIngr = ingredientById.get(ingredient._id) ?? { ingredient, quantity: 0};
      orderIngr.quantity += 1;
      ingredientById.set(ingredient._id, orderIngr);
      orderPrice += ingredient.price;
    }
  }

  return (
    <div className={styles.orderCard}>
      {/*<span>OrderInfo</span>*/}
      <div className={`${styles.centerText} text text_type_digits-default`}># {order.number}</div>
      <h2 className={`mt-10 mb-3 text text_type_main-medium`}>{order.name}</h2>
      <div className={`text text_type_main-small mb-15 ${styles.blueNumbers}`}>{orderStatusRu[order.status]}</div>
      <div className={`text_type_main-medium mb-6`}>Состав:
        <ul className={`custom-scroll ${styles.scrollWrapper}`}>
          {Array.from(ingredientById).map(([, item]) => (
            <li key={item.ingredient._id} className={styles.totalIngredients}>
              <div className={styles.ingredientImg}>
                <div className={`${styles.smallImgBorder}`}>
                  <div className={styles.smallImgContainer}>
                    <img className={styles.smallImg} src={item.ingredient.image} alt={item.ingredient.name}/>
                  </div>
                </div>
              </div>
              <h3 className={`text text_type_main-small ${styles.ingredientName}`}>{item.ingredient.name}</h3>
              <div className={styles.priceAndCount}>
                <p className={`text text_type_digits-default`}>{item.quantity}</p>
                <p className={`text text text_type_main-small`}> x </p>
                <p className={`text text_type_digits-default`}>{item.ingredient.price}</p>
                <CurrencyIcon type="primary"/>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.dateAndPrice}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.updatedAt)}
        />
        <div className={`text text_type_digits-default`}>{orderPrice} <CurrencyIcon type="primary"/></div>
      </div>
    </div>
  )
}