import { createSlice } from "@reduxjs/toolkit";

interface CartSliderInterface {
  isOpen: boolean;
}

const initialState: CartSliderInterface = {
  isOpen: false
};

const cartSliderSlice = createSlice({
  name: "cartSlider",
  initialState,
  reducers: {
    CartSliderIsOpenAction(state) {
      state.isOpen = true;
    },
    CartSliderIsClosedAction(state) {
      state.isOpen = false;
    },
  },
});

export const { CartSliderIsOpenAction, CartSliderIsClosedAction } = cartSliderSlice.actions;

export default cartSliderSlice.reducer;