import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Order = {
  isLoading: boolean,
  data?: {
    orderNumber: string
  },
  error?: Error
}

export const orderInitialState: Order = {
  isLoading: false,
  data: undefined,
  error: undefined
};


const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    sendOrderRequest(state) {
      state.isLoading = true;
      state.data = undefined;
      state.error = undefined;
    },
    sendOrderSuccess(state, action: PayloadAction<string>) {
      const orderNumber = action.payload
      state.isLoading = false;
      state.data = {orderNumber};
      state.error = undefined;
    },
    sendOrderFailure(state, action: PayloadAction<Error>) {
      const error = action.payload;
      state.isLoading = false;
      state.data = undefined;
      state.error = error;
    }
  }
});

export const { sendOrderRequest, sendOrderSuccess, sendOrderFailure} = orderSlice.actions;
export default orderSlice.reducer;