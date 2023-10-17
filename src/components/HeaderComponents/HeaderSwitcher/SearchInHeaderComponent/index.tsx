import React, { useState, useEffect } from "react";
import { View, TextInput, Platform, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { searchedPostsData } from "@/store/reducers/PostsSearchSlice";
import { searchedShopData } from "@/store/reducers/ShopsSearchSlice";
import { DataPostsTypeInterface } from "@/constants/types/dataPostsType";
import { DataShopTypeInterface } from "@/constants/types/dataShopType";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";
import { supportedLang } from "config";
import { useWidth } from "@/components/utils/useWidth";
import Slider from "@/components/routesCompponents/ShopComponents/CategoriesSlider";

const SearchInHeaderComponent = ({ page }) => {
  const postsData = useAppSelector((state) => state.postsData);
  const shopData = useAppSelector((state) => state.shopData);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  
  let data = []
  let message = ""
  if (page === "shop") {
    message = __("Search by items")
    data = shopData
  } else {
    message =__("Search by posts")
    data = postsData
  }

  useEffect(() => {
    const findedResults = data.filter((item) => {
            for (const lang of supportedLang) {
              const langKey = Object.keys(lang)[0];
              const fieldName = `name${langKey
                .charAt(0)
                .toUpperCase()}${langKey.slice(1)}`;
              if (
                (item[fieldName] &&
                  item[fieldName]
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (item.type &&
                  item.type.toLowerCase().includes(search.toLowerCase())) ||
                (item.secondType &&
                  item.secondType
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (item.keyWords &&
                  item.keyWords.toLowerCase().includes(search.toLowerCase()))
              ) {
                return true;
              }
            }
            return false;
          });
    const uniqueResultsSet = new Set(findedResults);

    const uniqueResultsArray = [...uniqueResultsSet];

    if (page === "shop") {
      dispatch(searchedShopData(uniqueResultsArray as DataShopTypeInterface[]));
    } else {
      dispatch(
        searchedPostsData(uniqueResultsArray as DataPostsTypeInterface[])
      );
    }
  }, [search]);

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  return (
    <>
      <View style={styles.searchContainer}>
        
        <TextInput
          style={[
            styles.input,
            {
              color: selectedTheme.text,
              ...Platform.select({
                web: {
                  outline: "none", // Apply outline style for web platform
                },
              }),
            },
          ]}
          placeholder={message + " ..."}
          value={search}
          onChangeText={handleSearchChange}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    marginHorizontal: 6,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default SearchInHeaderComponent;
