import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import FooterComponent from "@/components/FooterComponent";
import HeaderSwithcer from "@/components/HeaderComponents/HeaderSwitcher";
import { fetchShopData } from "@/store/reducers/ShopDataSlice";
import { sortTypeSliceAction } from "@/store/reducers/SortTypeSlice";

import uniqueShopData from "@/components/utils/uniqueShopData";
import {
  FlatList,
  useWindowDimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Colors from "config";
import ShopMiddleCardScreen from "@/components/ui/shopScreens/ShopMeddleCardScreen";
import ShopSmallCardScreen from "@/components/ui/shopScreens/ShopSmallCardScreen";
import CategoriesMenuComponent from "./CategoriesMenuComponent";
import CategoriesSlider from "./CategoriesSlider";
import { fetchCategoriesData } from "@/store/reducers/CategorySlice";
import CategoryFirstScreen from "./CategoriesMenuComponent/CategoryFirstScreen";
import CartSlider from "@/components/CartComponents/CartSlider";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { useLocalSearchParams } from "expo-router";

const ShopIndexComponent = ({ langPage }) => {
  const flatListRef = useRef(null);
  const data = uniqueShopData(useAppSelector((state) => state.shopData));
  const searchedData = uniqueShopData(
    useAppSelector((state) => state.shopSearch)
  );

  const iscartSliderOpen = useAppSelector(
    (state) => state.cartSliderSlice.isOpen
  );
  const eventForScrollToUp = useAppSelector(
    (state) => state.postsScrollToUpSlice.postsScrollToUp
  );
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentPageChangeAction("shopIndex"));
  }, []);


  useEffect(() => {
    dispatch(fetchShopData());
    dispatch(sortTypeSliceAction(""));
    dispatch(fetchCategoriesData());
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [eventForScrollToUp]);

  if (!data) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />;
      </View>
    );
  }

  const { width } = useWindowDimensions();
  const size = Math.round(width / 500);

  return size < 2 ? (
    <>
      <CategoriesSlider langPage={langPage} />
      <CartSlider size="small" langPage={langPage} />
      <FlatList
        ref={flatListRef}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        data={searchedData.length > 0 ? searchedData : data}
        renderItem={({ item }) => (
          <View style={styles.middleContainer}>
            <ShopSmallCardScreen langPage={langPage} item={item} />
          </View>
        )}
        keyExtractor={(item) => item.path}
        numColumns={2}
        key={size}
        snapToInterval={100}
        decelerationRate="fast"
        style={[
          styles.smallScreenContainer,
          { backgroundColor: selectedTheme.background },
        ]}
        ListHeaderComponent={
          <>
            <HeaderSwithcer page="shop" />
            <CategoryFirstScreen smallText={true} />
            <View style={{ marginBottom: 80 }}></View>
          </>
        }
        ListFooterComponent={FooterComponent}
      />
    </>
  ) : (
    <>
      <HeaderSwithcer page="shop" />
      {!iscartSliderOpen ? (
        <CategoriesMenuComponent langPage={langPage} />
      ) : (
        <View
          style={{
            width: 180,
            height: "100%",
            position: "absolute",
            top: 60,
            backgroundColor: selectedTheme.background,
          }}
        />
      )}
      <CartSlider size="middle" langPage={langPage} />
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        initialNumToRender={9}
        data={searchedData.length > 0 ? searchedData : data}
        renderItem={({ item }) => {
          return (
            <View style={styles.middleContainer}>
              <ShopMiddleCardScreen langPage={langPage} item={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.path}
        numColumns={size > 3 ? 3 : size}
        key={size}
        style={[
          styles.container,
          { backgroundColor: selectedTheme.background },
        ]}
        ListHeaderComponent={
          <>
            <CategoryFirstScreen smallText={false} />
            <View style={{ marginBottom: 100 }}></View>
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  smallScreenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginLeft: 180,
  },
  containerForMenuAndFlatList: {
    width: "100%",
    position: "relative",
  },
  middleContainer: {
    flex: 1,
    alignItems: "center",
  },
  sliderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
  },
});

export default ShopIndexComponent;
