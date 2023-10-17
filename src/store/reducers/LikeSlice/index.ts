// This slice for creation array likes
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Platform } from "react-native";

interface LikeState {
  id: string;
  like: boolean;
  page: string;
}

const initialState: LikeState[] = [];

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    likeAdd: (state, action: PayloadAction<LikeState>) => {
      const { id, like, page } = action.payload; 
      const existingItem = state.find((item) => item.id === id && item.page === page);

      if (existingItem) {
        existingItem.like = like;
        existingItem.page = page;
      } else {
        state.push({ id, like, page });
      }

      if (Platform.OS === "web") {
        const stateString = JSON.stringify(state);
        localStorage.setItem("LikePostsData", stateString);
      }
    },
    fetchLikeData: (state, action: PayloadAction<string>) => {
      if (Platform.OS === "web") {
        const localStorageData = localStorage.getItem("LikePostsData");

        if (localStorageData) {
          const parsedData: LikeState[] = JSON.parse(localStorageData);
          state.splice(0, state.length, ...parsedData);
        }
      }
    },
  },
});

export const { likeAdd, fetchLikeData } = likeSlice.actions;

export default likeSlice.reducer;