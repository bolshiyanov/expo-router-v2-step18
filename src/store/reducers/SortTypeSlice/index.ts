// This slice save selected choice : search, filter, sort
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortTypeState {
  sortType: string;
}

const initialState: SortTypeState = {
  sortType: '',
};

export const PostsHeaderSwonComponentSlice = createSlice({
  name: "sortType",
  initialState,
  reducers: {
    sortTypeSliceAction(state, action: PayloadAction<string>) {
      state.sortType = action.payload;}
  },
});

export const { sortTypeSliceAction } = PostsHeaderSwonComponentSlice.actions;

export default PostsHeaderSwonComponentSlice.reducer; 
