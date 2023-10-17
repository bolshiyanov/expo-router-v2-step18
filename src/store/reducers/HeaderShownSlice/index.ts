// This slice save selected choice : normal(search), sort or filter.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderShownInterface {
  headerShownSelect: string;
}

const initialState: HeaderShownInterface = {
  headerShownSelect: "search",
};

export const HeaderShownSlice = createSlice({
  name: "headerShownSelect",
  initialState,
  reducers: {
    headerShownAction(state, action: PayloadAction<string>) {
      state.headerShownSelect = action.payload;
    },
  },
});

export const { headerShownAction } = HeaderShownSlice.actions;

export default HeaderShownSlice.reducer;
