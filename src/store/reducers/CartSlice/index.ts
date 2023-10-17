// this slice for added and remova items to state and to local Storage

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Platform } from "react-native";

interface CartStateInterface {
  id: string;
  number: number;
  name: string;
  image: string;
  price: number
}

const initialState: CartStateInterface[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAdd: (state, action: PayloadAction<{ id: string; name: string; image: string, price: number }>) => {
      const { id, name, image, price } = action.payload;
    
      const existingItemIndex = state.findIndex((item) => item.id === id);
    
      if (existingItemIndex !== -1) {
        state[existingItemIndex].number += 1;
        state[existingItemIndex].image = image;
        state[existingItemIndex].price = price;
      } else {
        state.push({ id, number: 1, image, name, price });
      }
    
      if (Platform.OS === "web") {
        const stateString = JSON.stringify(state);
        localStorage.setItem("CartData", stateString);
      }
    },
    minusOneFromItem: (state, action: PayloadAction<string>) => {
      const  id  = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === id);
    
      if (existingItemIndex !== -1) {
        // Create a new object with the updated values
        const updatedItem = {
          ...state[existingItemIndex],
          number: state[existingItemIndex].number - 1,
          
        };
    
        // Create a new state array with the updated item
        const newState = [...state];
        newState[existingItemIndex] = updatedItem;
    
        if (Platform.OS === "web") {
          const stateString = JSON.stringify(newState);
          localStorage.setItem("CartData", stateString);
        }
    
        return newState;
      }
    
      // Return the original state if the item is not found
      return state;
    },
    removeOneItem: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === idToRemove);

      if (existingItemIndex !== -1) {
        state.splice(existingItemIndex, 1); // Remove the item from the cart

        if (Platform.OS === "web") {
          const stateString = JSON.stringify(state);
          localStorage.setItem("CartData", stateString);
        }
      }
    },
    cartAllRemove: (state) => {
      state.splice(0, state.length); // Remove all items from the cart

      if (Platform.OS === "web") {
        localStorage.removeItem("CartData"); // Remove cart data from local storage
      }
    },
    fetchCartData: (state, action: PayloadAction<string>) => {
      if (Platform.OS === "web") {
        const localStorageData = localStorage.getItem("CartData");

        if (localStorageData) {
          const parsedData: CartStateInterface[] = JSON.parse(localStorageData);
          state.splice(0, state.length, ...parsedData);
        }
      }
    },
  },
});

export const { cartAdd, minusOneFromItem, removeOneItem, cartAllRemove, fetchCartData } =
  cartSlice.actions;

export default cartSlice.reducer;
