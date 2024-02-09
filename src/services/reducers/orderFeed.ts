import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type OrderItem = {
  _id: string,
  number: number,
  status: "created" | "pending" | "done"
  name: string,
  ingredients: string[],
  updatedAt: string
}

type OrderFeedState = { orders: OrderItem[], total: number, totalToday: number};

const orderFeedInitialState:  OrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
}

const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState: orderFeedInitialState,
  reducers: {
    setFeedState(state, action: PayloadAction<OrderFeedState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { setFeedState } = orderFeedSlice.actions;
export default orderFeedSlice.reducer;
