export const API_BASE_URL = 'https://norma.nomoreparties.space/api'


export const WS_ORDER_FEED_URL = "wss://norma.nomoreparties.space/orders";
export const WS_ORDER_FEED_ALL_URL = "wss://norma.nomoreparties.space/orders/all";

export const orderStatusRu: { [k: string]: string } = {
  done: "Готов",
  pending: "В работе",
  created: "Создан",
}