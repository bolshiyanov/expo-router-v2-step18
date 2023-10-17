import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsData from "./reducers/PostsDataSlice";
import postsSearch from "./reducers/PostsSearchSlice";
import shopSearch from "./reducers/ShopsSearchSlice";
import likeSlice from "./reducers/LikeSlice";
import readSlice from "./reducers/ReadSlice";
import categoriesSliderSlice from "./reducers/CategoriesSlider";
import cartSliderSlice from "./reducers/CartSlider";
import themeSlice from "./reducers/ThemeSlice";
import langSlice from "./reducers/LangSlice";
import sortTypeSlice from "./reducers/SortTypeSlice";
import postsScrollToUpSlice from "./reducers/ScrollToUpSlice";
import headerShownSlice from "./reducers/HeaderShownSlice";
import categorySlice from "./reducers/CategorySlice";
import addedToCartSlice from "./reducers/AddedToCartSlice";
import cartSlice from "./reducers/CartSlice";
import shopData from "./reducers/ShopDataSlice";
import availableInStock from "./reducers/AvailableInStoskSlice";
import currentPageSlice from "./reducers/CurrentPageSlice";
import ordersSlice from "./reducers/OrdersSlice";
import progressBarSlice from "./reducers/ProgressBarSlice";

const rootReducer = combineReducers({
  postsData,
  shopData,
  postsSearch,
  shopSearch,
  likeSlice,
  readSlice,
  themeSlice,
  langSlice,
  sortTypeSlice,
  headerShownSlice,
  postsScrollToUpSlice,
  categoriesSliderSlice,
  cartSliderSlice,
  categorySlice,
  addedToCartSlice,
  cartSlice,
  availableInStock,
  currentPageSlice,
  ordersSlice,
  progressBarSlice
  
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
