import {useAppDispatch, useProfileOrderFeed} from "../../hooks";
import {OrderInfo} from "../../components/order-info/order-info";

export const ProfileOrderDetailPage: React.FunctionComponent = () => {
  useProfileOrderFeed(useAppDispatch())

  return (
    <div>
      <span>ProfileOrderDetailPage</span>
      <OrderInfo></OrderInfo>
    </div>
  )
}