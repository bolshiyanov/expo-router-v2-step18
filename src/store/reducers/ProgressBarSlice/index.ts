import { createSlice } from "@reduxjs/toolkit";

interface ProgressBarInterface {
 customer: boolean;
  delivery: boolean;
  payment: boolean;
}

const initialState: ProgressBarInterface = {
  customer: false,
  delivery: false,
  payment: false,
};

const progressBarSlice = createSlice({
  name: "progressBar",
  initialState,
  reducers: {
    CustomerInProgressBarAction(state) {
      state.customer = true;
      state.delivery = false;
      state.payment = false;
    },
    DeliveryInProgressBarAction(state) {
      state.customer = true;
      state.delivery = true;
      state.payment = false;
    },
    PaymentInProgressBarAction(state) {
      state.customer = true;
      state.delivery = true;
      state.payment = true;
    },
   RemoveAllInProgressBarAction(state) {
      state.customer = false;
      state.delivery = false;
      state.payment = false;
    },
  },
});

export const { CustomerInProgressBarAction, DeliveryInProgressBarAction, PaymentInProgressBarAction, RemoveAllInProgressBarAction} = progressBarSlice.actions;

export default progressBarSlice.reducer;