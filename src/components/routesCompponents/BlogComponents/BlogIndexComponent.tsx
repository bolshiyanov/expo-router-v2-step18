import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import FooterComponent from "@/components/FooterComponent";
import HeaderSwithcer from "@/components/HeaderComponents/HeaderSwitcher";
import { fetchData } from "@/store/reducers/PostsDataSlice";
import { sortTypeSliceAction } from "@/store/reducers/SortTypeSlice";

import {
  FlatList,
  useWindowDimensions,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import Colors from "config";
import RenderPostMovilComponent from "@/components/ui/PostsCards/movilSize";
import RenderPostMiddleSizeComponent from "@/components/ui/PostsCards/mediumSize";
import uniquePostsData from "@/components/utils/uniquePostsData";
import CartSlider from "@/components/CartComponents/CartSlider";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";

const BlogIndexComponent = ({ langPage }) => {
  const flatListRef = useRef(null);
  

  const data = uniquePostsData(useAppSelector((state) => state.postsData));
  const searchedData = uniquePostsData(
    useAppSelector((state) => state.postsSearch)
  );

  const eventForScrollToUp = useAppSelector(
    (state) => state.postsScrollToUpSlice.postsScrollToUp
  );

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentPageChangeAction("blogIndex"));
  }, []);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(sortTypeSliceAction(""));
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
      <CartSlider size="small" langPage={langPage} />
      <FlatList
        ref={flatListRef}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        data={searchedData.length > 0 ? searchedData : data}
        renderItem={({ item }) => (
          <View style={styles.middleContainer}>
            <RenderPostMovilComponent langPage={langPage} item={item} />
          </View>
        )}
        keyExtractor={(item) => item.path}
        numColumns={1}
        key={size}
        snapToInterval={100}
        decelerationRate="fast"
        style={[
          styles.container,
          { backgroundColor: selectedTheme.background },
        ]}
        ListHeaderComponent={<HeaderSwithcer page="blog" />}
        ListFooterComponent={FooterComponent}
      />
    </>
  ) : (
    <>
      <CartSlider size="middle" langPage={langPage} />
      <FlatList
        ref={flatListRef}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        data={searchedData.length > 0 ? searchedData : data}
        renderItem={({ item }) => {
          let index;

          if (searchedData.length > 0) {
            index = searchedData.findIndex(
              (dataItem) => dataItem.path === item.path
            );
          } else {
            index = data.findIndex((dataItem) => dataItem.path === item.path);
          }

          return (
            <View style={styles.middleContainer}>
              <RenderPostMiddleSizeComponent
                langPage={langPage}
                item={item}
                index={index}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.path}
        numColumns={1}
        key={size}
        style={[
          styles.container,
          { backgroundColor: selectedTheme.background },
        ]}
        ListHeaderComponent={<HeaderSwithcer page="blog" />}
        ListFooterComponent={FooterComponent}
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

  container: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BlogIndexComponent;
