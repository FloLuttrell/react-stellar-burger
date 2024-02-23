import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {OrderCard} from "../../components/order-card/order-card";
import {buildWsOrderFeedUrl} from "../../utils/functions";
import {wsConnectionStart} from "../../services/reducers/orderFeed";
import {useEffect} from "react";


export const ProfileOrderListPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const feedUrl = buildWsOrderFeedUrl();
  useEffect(() => {
    dispatch(wsConnectionStart(feedUrl))
  }, [dispatch, feedUrl]);
  const orders = useAppSelector((s) => s.orderFeed.orders);
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}
             onClick={() => navigate(`/profile/orders/${order._id}`, {state: {backgroundLocation: location}})}>
          <OrderCard order={order} showOrderState={true}></OrderCard>
        </div>
      ))}
    </div>
  )
}