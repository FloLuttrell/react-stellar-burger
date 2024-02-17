import {useAppDispatch,} from "../../hooks";
import {OrderInfo} from "../../components/order-info/order-info";
import {buildWsOrderFeedUrl} from "../../utils/functions";
import {wsConnectionStart} from "../../services/reducers/orderFeed";
import {useEffect} from "react";

export const ProfileOrderDetailPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const feedUrl = buildWsOrderFeedUrl();
  useEffect(() => {
    dispatch(wsConnectionStart(feedUrl))
  }, [dispatch, feedUrl]);

  return (
    <OrderInfo></OrderInfo>
  )
}