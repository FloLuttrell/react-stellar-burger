import {AllOrders} from "../../components/all-orders/all-orders";
import {ReadyOrders} from "../../components/ready-orders/ready-orders";
import styles from "./order-feed-page.module.css";
import {useAppDispatch} from "../../hooks";
import {WS_ORDER_FEED_ALL_URL} from "../../utils/consts";
import {useEffect} from "react";
import {wsConnectionStart} from "../../services/reducers/orderFeed";


export const OrderFeedPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart(WS_ORDER_FEED_ALL_URL))
  }, [dispatch]);

  return (
    <div className={styles.feed}>
      <div className={styles.container}>
        <h1 className={`text text_type_main-large mt-10 mb-5 ${styles.header}`}>Лента заказов</h1>
        <main className={styles.content}>
          <div className={styles.contentPart}>
            <AllOrders/>
          </div>
          <div className={`p-10`}>
          </div>
          <div className={styles.contentPart}>
            <ReadyOrders/>
          </div>
        </main>
      </div>
    </div>
  )
}