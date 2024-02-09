import styles from "../ready-orders/ready-orders.module.css"
import {useAppSelector} from "../../hooks";

export const ReadyOrders: React.FunctionComponent = () => {
  const orderFeedState = useAppSelector((s) => s.orderFeed);

  const batchSize = 10;
  const ordersPending = orderFeedState.orders
    .filter(o => o.status === "pending")
    .slice(0, batchSize)
  const ordersDone = orderFeedState.orders
    .filter(o => o.status === "done")
    .slice(0, batchSize)


  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        <div className={styles.info}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <div className={styles.numberField}>
            <div className="column">
              {ordersDone.map((order, idx) => (
                <div key={order._id} className="row">
                  <p className={`text text_type_digits-default ${styles.numberCustomColor}`}>
                    {order.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <div className="column">
            {ordersPending.map((order, idx) => (
              <div key={order._id} className="row">
                <p className={`text text_type_digits-default ${styles.numberCustomColor}`}>
                  {order.number}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">
          Выполнено за все время:
        </p>
        <p className={`text text_type_digits-large ${styles.glowNumbers}`}>
          {orderFeedState.total}
        </p>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.glowNumbers}`}>
          {orderFeedState.totalToday}
        </p>
      </div>
    </div>
  )
}