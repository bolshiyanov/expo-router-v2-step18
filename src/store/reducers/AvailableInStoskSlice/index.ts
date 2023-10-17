// In this slice will save data after search, filtred and after sort
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface  availableInStockInterface {
  id: string;
  available: number;
}



const initialState: availableInStockInterface[] = [];

export const availableInSlice = createSlice({
  name: "availableInStock",
  initialState,
  reducers: {
    
    fetchRestOfStockData: (
      state,
      action: PayloadAction<availableInStockInterface[]>
    ) => {
      const newState = [];
      newState.push(...action.payload);
       
      return newState;
      
    },
  },
});

export const {
  // stockOneItemRemove, stockOneItemAdd,
   fetchRestOfStockData } = availableInSlice.actions;

export default availableInSlice.reducer;
