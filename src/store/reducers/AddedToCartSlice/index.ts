// This slice for creating array of posts, that was readed
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Platform } from "react-native"; // Импортируйте Platform из react-native

interface AddedToTheCartState {
  id: string;
  date: number;
}

const initialState: AddedToTheCartState[] = [];

export const addedToCartSlice = createSlice({
  name: "addedToCart",
  initialState,
  reducers: {
    addToCartAction: (state, action: PayloadAction<{ id: string; date: number }>) => {
      const { id, date } = action.payload;

      const existingItemIndex = state.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].date = date;
      } else {
        state.push({ id, date });
      }

      if (Platform.OS === "web") {
        const stateString = JSON.stringify(state);
        localStorage.setItem("AddedToCartData", stateString);
      }
    },
    fetchAddedToTheCartData: (state, action: PayloadAction<string>) => {
      if (Platform.OS === "web") {
        const localStorageData = localStorage.getItem("AddedToCartData");

        if (localStorageData) {
          const parsedData: AddedToTheCartState[] = JSON.parse(localStorageData);
          state.splice(0, state.length, ...parsedData);
        }
      }
    },
  },
});

export const { addToCartAction, fetchAddedToTheCartData } = addedToCartSlice.actions;

export default addedToCartSlice.reducer;