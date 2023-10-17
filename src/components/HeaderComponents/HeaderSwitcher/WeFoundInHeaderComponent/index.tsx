import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";
import uniquePostsData from "@/components/utils/uniquePostsData";
import uniqueShopData from "@/components/utils/uniqueShopData";
import { useWidth } from "@/components/utils/useWidth";

const WeFoundInHeaderComponent = ({ title, page }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const postsData = uniquePostsData(useAppSelector((state) => state.postsData));
  const searchedPostData = uniquePostsData(
    useAppSelector((state) => state.postsSearch)
  );

  const shopData = uniqueShopData(useAppSelector((state) => state.shopData));
  const searchedShopData = uniqueShopData(
    useAppSelector((state) => state.shopSearch)
  );

  let numbersOfPosts = 0;
  if (searchedPostData.length > 0) {
    numbersOfPosts = searchedPostData.length;
  } else {
    numbersOfPosts = postsData.length;
  }

  let numbersOfItems = 0;
  if (searchedShopData.length > 0) {
    numbersOfItems = searchedShopData.length;
  } else { 
    numbersOfItems = shopData.length;
  }

  let message = "";
  if (!useWidth(420)) {
  if (page === "blog") {
    message = `   ${__("We found")} ${numbersOfPosts}`;
  } else {
    message = `  ${__("We found")} ${numbersOfItems}`;
  }} else {
    if (page === "blog") {
      message = ` ${title}: ${__("We found")} ${numbersOfPosts}`;
    } else {
      message = ` ${title}: ${__("We found")} ${numbersOfItems}`;
    }}
  

  return (
    <View>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.title, { color: selectedTheme.text }]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexWrap: "nowrap",
    textAlign: "left",
    fontSize: 18,
    overflow: "hidden",
  },
});

export default WeFoundInHeaderComponent;
