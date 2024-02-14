import {OrderInfo} from "../../components/order-info/order-info";
import {useAppDispatch, useOrderFeed} from "../../hooks";
import styles from "./order-feed-detail-page.module.css"
import {AppHeader} from "../../components/app-header/app-header";
import {WS_ORDER_FEED_ALL_URL} from "../../utils/consts";

export const OrderFeedDetailPage: React.FunctionComponent = () => {
  useOrderFeed(useAppDispatch(), WS_ORDER_FEED_ALL_URL);
  return (
    <div>
      <AppHeader></AppHeader>
      <div className={styles.spacer}></div>
      <OrderInfo></OrderInfo>
    </div>
  )
}