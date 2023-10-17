// In this slice will save data after search, filtred and after sort
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchPostsTypeInterface } from "@/constants/types/dataPostsType";
import data from "@/data/dataPosts";

const initialState: SearchPostsTypeInterface[] = [];

export const postsSearchSlice = createSlice({
  name: "postsSearch",
  initialState,
  reducers: {
    searchedPostsData: (
      state,
      action: PayloadAction<SearchPostsTypeInterface[]>
    ) => {
      const newState = [];
      newState.push(...action.payload); 
      return newState;
    },
    fetchSearchPostData: (state) => {
      if (data.length != 0) {
        state.push(...data);
      }
    },
  },
});

export const { searchedPostsData, fetchSearchPostData } = postsSearchSlice.actions;

export default postsSearchSlice.reducer;
