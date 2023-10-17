// This slice save apps theme 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeChangeAction(state, action: PayloadAction<string>) {
      if (action.payload === 'light') {
        return { ...state, theme: 'light' };
      } else if (action.payload === 'dark') {
        return { ...state, theme: 'dark' };
      }
    }
  },
});

export const { themeChangeAction } = themeSlice.actions;

export default themeSlice.reducer;
