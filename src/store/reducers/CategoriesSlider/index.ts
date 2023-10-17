import { createSlice } from "@reduxjs/toolkit";

interface CategoriesSliderInterface {
  isOpen: boolean;
}

const initialState: CategoriesSliderInterface = {
  isOpen: false
};

const categoriesSliderSlice = createSlice({
  name: "categorieSlider",
  initialState,
  reducers: {
    CategoriesSliderIsOpenAction(state) {
      state.isOpen = true;
    },
    CategoriesSliderIsClosedAction(state) {
      state.isOpen = false;
    },
  },
});

export const { CategoriesSliderIsOpenAction, CategoriesSliderIsClosedAction } = categoriesSliderSlice.actions;

export default categoriesSliderSlice.reducer;