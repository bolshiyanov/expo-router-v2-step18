//This base slice for posts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataShopTypeInterface } from "@/constants/types/dataShopType";
import data from "@/data/dataShops";

const initialState: DataShopTypeInterface[] = [];

export const shopDataSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShopData: (state, action: PayloadAction<DataShopTypeInterface[]>) => {
      state.push(...action.payload);
    },
    replaceShopData: (
      state,
      action: PayloadAction<DataShopTypeInterface[]>
    ) => {
      const newState = [];
      newState.push(...action.payload); 
      return newState;
    },
    fetchShopData: (state) => {
      state.push(...data);
    },
  },
});

export const { addShopData, fetchShopData, replaceShopData } = shopDataSlice.actions;

export default shopDataSlice.reducer;
