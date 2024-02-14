import {useAppDispatch, useOrderFeed,} from "../../hooks";
import {OrderInfo} from "../../components/order-info/order-info";
import {buildWsOrderFeedUrl} from "../../utils/functions";

export const ProfileOrderDetailPage: React.FunctionComponent = () => {
  useOrderFeed(useAppDispatch(), buildWsOrderFeedUrl())

  return (
    <div>
      <span>ProfileOrderDetailPage</span>
      <OrderInfo></OrderInfo>
    </div>
  )
}