//This base slice for posts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataPostsTypeInterface } from "@/constants/types/dataPostsType";
import dataPosts from "@/data/dataPosts";

const initialState: DataPostsTypeInterface[] = [];

export const postsDataSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<DataPostsTypeInterface[]>) => {
      state.push(...action.payload);
    },
    fetchData: (state) => {
      state.push(...dataPosts);
    },
  },
});

export const { addData, fetchData } = postsDataSlice.actions;

export default postsDataSlice.reducer;
