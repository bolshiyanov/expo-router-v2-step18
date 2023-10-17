// In this slice will save data after search, filtred and after sort
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchShopTypeInterface } from "@/constants/types/dataShopType";
import data from "@/data/dataShops";

const initialState: SearchShopTypeInterface[] = [];

export const shopsSearchSlice = createSlice({
  name: "shopSearch",
  initialState,
  reducers: {
    searchedShopData: (
      state,
      action: PayloadAction<SearchShopTypeInterface[]>
    ) => {
      const newState = [];
      newState.push(...action.payload); 
      return newState;
    },
    fetchSearchShopData: (state) => {
      if (data.length != 0) {
        state.push(...data);
      }
    },
  },
});

export const { searchedShopData, fetchSearchShopData } = shopsSearchSlice.actions;

export default shopsSearchSlice.reducer;
