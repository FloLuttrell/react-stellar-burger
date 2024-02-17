import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type OrderItem = {
  _id: string,
  number: number,
  status: "created" | "pending" | "done"
  name: string,
  ingredients: string[],
  updatedAt: string
}

type OrderFeedState = { orders: OrderItem[], total: number, totalToday: number };

export const orderFeedInitialState: OrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
}

const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState: orderFeedInitialState,
  reducers: {
    wsConnectionStart(state, action: PayloadAction<string>) {},
    wsConnectionSuccess(state, action: PayloadAction<void>) {},
    wsConnectionError(state, action: PayloadAction<void>) {},
    wsConnectionClosed(state, action: PayloadAction<void>) {},
    wsConnectionMessage(state, action: PayloadAction<any>) {
      const data = action.payload;
      const parsedData = JSON.parse(data);
      if (parsedData.success) {
        state.orders = parsedData.orders;
        state.total = parsedData.total;
        state.totalToday = parsedData.totalToday;
      }
    },
  }
});

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsConnectionMessage,
} = orderFeedSlice.actions;
export default orderFeedSlice.reducer;
