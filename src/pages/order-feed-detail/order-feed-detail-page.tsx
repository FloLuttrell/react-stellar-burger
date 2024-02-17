import {OrderInfo} from "../../components/order-info/order-info";
import {useAppDispatch} from "../../hooks";
import styles from "./order-feed-detail-page.module.css"
import {WS_ORDER_FEED_ALL_URL} from "../../utils/consts";
import {wsConnectionStart} from "../../services/reducers/orderFeed";
import {useEffect} from "react";

export const OrderFeedDetailPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart(WS_ORDER_FEED_ALL_URL))
  }, [dispatch]);
  return (
    <>
      <div className={styles.spacer}></div>
      <OrderInfo></OrderInfo>
    </>
  )
}