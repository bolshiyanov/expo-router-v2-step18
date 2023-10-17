// in this slice will save launguage from users choice in the footer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LangState {
  lang: string;
}

const initialState: LangState = {
  lang: '',
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    langChangeAction(state, action: PayloadAction<string>) {
      state.lang = action.payload;}
  },
});

export const { langChangeAction } = langSlice.actions;

export default langSlice.reducer;
