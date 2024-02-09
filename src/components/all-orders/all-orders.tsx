import {OrderCard} from "../order-card/order-card";
import styles from "../all-orders/all-orders.module.css";
import {useAppSelector} from "../../hooks";
import {useLocation, useNavigate } from "react-router-dom";

export const AllOrders: React.FunctionComponent = () => {
  const orders = useAppSelector((s) => s.orderFeed.orders);
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={styles.content}>
      <div className={`${styles.orderItems}`}>
        <div className={`${styles.scrollWrapper} custom-scroll`}>
          {orders.map((order) => (
            <div key={order._id} onClick={() =>  navigate(`/feed/${order._id}`, {state: {backgroundLocation: location}})}>
              <OrderCard order={order}></OrderCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}