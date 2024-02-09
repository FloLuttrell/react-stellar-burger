import {AllOrders} from "../../components/all-orders/all-orders";
import {ReadyOrders} from "../../components/ready-orders/ready-orders";
import {AppHeader} from "../../components/app-header/app-header";
import styles from "./order-feed-page.module.css";
import {useAppDispatch, useOrderFeed} from "../../hooks";


export const OrderFeedPage: React.FunctionComponent = () => {
  useOrderFeed(useAppDispatch())
  return (
    <>
      <div className={styles.feed}>
        <AppHeader/>
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
    </>
  )
}