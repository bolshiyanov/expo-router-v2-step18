// in this slice will save launguage from users choice in the footer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentPageInterface {
  currentPage: string;
}

const initialState: CurrentPageInterface = {
  currentPage: 'any',
};

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    currentPageChangeAction(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;}
  },
});

export const { currentPageChangeAction } = currentPageSlice.actions;

export default currentPageSlice.reducer;
