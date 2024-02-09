import {OrderInfo} from "../../components/order-info/order-info";
import {useAppDispatch, useOrderFeed} from "../../hooks";
import styles from "./order-feed-detail-page.module.css"
import {AppHeader} from "../../components/app-header/app-header";

export const OrderFeedDetailPage: React.FunctionComponent = () => {
  useOrderFeed(useAppDispatch());
  return (
    <div>
      <AppHeader></AppHeader>
      <div className={styles.spacer}></div>
      <OrderInfo></OrderInfo>
    </div>
  )
}