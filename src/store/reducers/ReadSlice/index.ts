// This slice for creating array of posts, thatw was readed
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Platform } from "react-native"; // Импортируйте Platform из react-native

interface ReadState {
  id: string;
  date: number;
}

const initialState: ReadState[] = [];

export const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    readAdd: (state, action: PayloadAction<{ id: string; date: number }>) => {
      const { id, date } = action.payload;

      const existingItemIndex = state.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].date = date;
      } else {
        state.push({ id, date });
      }

      if (Platform.OS === "web") {
        const stateString = JSON.stringify(state);
        localStorage.setItem("ReadPostsData", stateString);
      }
    },
    fetchReadeData: (state, action: PayloadAction<string>) => {
      if (Platform.OS === "web") {
        const localStorageData = localStorage.getItem("ReadPostsData");

        if (localStorageData) {
          const parsedData: ReadState[] = JSON.parse(localStorageData);
          state.splice(0, state.length, ...parsedData);
        }
      }
    },
  },
});

export const { readAdd, fetchReadeData } = readSlice.actions;

export default readSlice.reducer;