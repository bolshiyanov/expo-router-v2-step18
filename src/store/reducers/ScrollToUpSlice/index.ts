import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface scrollToInterface {
  postsScrollToUp: boolean;
  keyWordHasCkliked: string[];
}

const initialState: scrollToInterface = {
  postsScrollToUp: false,
  keyWordHasCkliked: [],
};

export const PostsScrollToUpSlice = createSlice({
  name: "postsScroll",
  initialState,
  reducers: {
    scrollToUpAction(state) {
      state.postsScrollToUp = !state.postsScrollToUp;
    },
    postsScrollToUpAction(state, action: PayloadAction<string[]>) {
      state.keyWordHasCkliked = action.payload;
    },
  },
});

export const { postsScrollToUpAction, scrollToUpAction } =
  PostsScrollToUpSlice.actions;

export default PostsScrollToUpSlice.reducer;
