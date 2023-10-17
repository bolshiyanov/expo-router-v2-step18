import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AllFilterComponent from "../AllFilterComponents";
import SortingComponent from "../SortComponents";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { fetchSearchPostData } from "@/store/reducers/PostsSearchSlice";
import { fetchSearchShopData } from "@/store/reducers/ShopsSearchSlice";
import { sortTypeSliceAction } from "@/store/reducers/SortTypeSlice";

import { headerShownAction } from "@/store/reducers/HeaderShownSlice";
import HeaderButton from "./HeaderButton";
import SearchInHeaderComponent from "./SearchInHeaderComponent";
import WeFoundInHeaderComponent from "./WeFoundInHeaderComponent";
import {
  CategoriesSliderIsOpenAction,
  CategoriesSliderIsClosedAction,
} from "@/store/reducers/CategoriesSlider";
import EmptyTitle from "./EmptyTitle";
import Colors from "config";
import { useWidth } from "../../utils/useWidth";
import { __ } from "../../LanguageComponents/TranslateComponent/systemTranslatre";

const HeaderSwitcher = ({ page }) => {
  const isRowLayout = useWidth(768);

  const [shownComponent, setShownComponent] = useState("");

  const selectedComponent = useAppSelector(
    (state) => state.headerShownSlice.headerShownSelect
  );
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const dataCart = useAppSelector((state) => state.cartSlice);
  const isOpen = useAppSelector((state) => state.categoriesSliderSlice.isOpen);
  const sortitle = `${__("Sorting")}`;
  const filterTitle = `${__("Filtring")}`;
  const shownMenu = !useWidth(768);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setShownComponent(selectedComponent);
    dispatch(fetchSearchPostData());
    dispatch(fetchSearchShopData());
    dispatch(sortTypeSliceAction(""));
  }, [selectedComponent]);

  const handleComponentChange = (component) => {
    dispatch(headerShownAction(component));
    setShownComponent(component);
  };

  

  const isOpenSlider = () => {
    if (!isOpen) {
      dispatch(CategoriesSliderIsOpenAction());
    } else {
      dispatch(CategoriesSliderIsClosedAction());
    }
  };

  let componentToRender;
  switch (shownComponent) {
    case "search":
      componentToRender = <SearchInHeaderComponent page={page} />;
      break;
    case "sort":
      componentToRender = (
        <WeFoundInHeaderComponent title={sortitle} page={page} />
      );
      break;
    case "filter":
      componentToRender = (
        <WeFoundInHeaderComponent title={filterTitle} page={page} />
      );
      break;
    case "null":
      componentToRender = <EmptyTitle page={page} />;
      break;
    default:
      break;
  }

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: selectedTheme.backgroundNav },
        { borderColor: selectedTheme.borderLine },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <>
            {page === "shop" && shownMenu && (
              <HeaderButton
                active={shownComponent === "null"}
                onPress={isOpenSlider}
                iconName="bars"
              />
            )}
            {componentToRender}
          </>
        </View>
        <View style={[styles.filtredButtonsContainer]}>
          <HeaderButton
            active={shownComponent === "search"}
            onPress={() => handleComponentChange("search")}
            iconName="search"
          />

          <HeaderButton
            active={shownComponent === "sort"}
            onPress={() => handleComponentChange("sort")}
            iconName="arrow-down-wide-short-solid"
          />
          {isRowLayout && <View style={{ width: 48 }} />}
          {dataCart.length > 0 && isRowLayout && <View style={{ width: 48 }} />}
        </View>
      </View>
      {shownComponent === "sort" && <SortingComponent page={page} />}
      {shownComponent === "filter" && <AllFilterComponent page={page} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    borderBottomWidth: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: 60,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginHorizontal: 12,
  },
  searchContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingHorizontal: 6,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  filtredButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
  },
});

export default HeaderSwitcher;
