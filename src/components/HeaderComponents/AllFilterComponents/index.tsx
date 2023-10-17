import React, { useEffect, useState } from "react";
import { Platform, Pressable, View, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { searchedPostsData } from "@/store/reducers/PostsSearchSlice";
import { searchedShopData } from "@/store/reducers/ShopsSearchSlice";
import { postsScrollToUpAction } from "@/store/reducers/ScrollToUpSlice";

import { fetchLikeData } from "@/store/reducers/LikeSlice";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";
import { useWidth } from "@/components/utils/useWidth";

const AllFilterComponent = ({ page }) => {
  const postsData = useAppSelector((state) => state.postsData);
  const shopData = useAppSelector((state) => state.shopData);

  const dataLike = useAppSelector((state) => state.likeSlice);
  const scrollToUpp = useAppSelector(
    (state) => state.postsScrollToUpSlice.postsScrollToUp
  );

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dispatch = useAppDispatch();
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const [keyWordsForFiltring, setKeyWordsForFiltring] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const message = __("My Likes");

  let data = [];
  if (page === "blog") {
    data = postsData;
  } else {
    data = shopData;
  }

  useEffect(() => {
    dispatch(fetchLikeData());
  }, [dispatch]);

  useEffect(() => {
    setKeyWordsForFiltring([]);
  }, [scrollToUpp]);

  const uniqueExtractedWords = new Set();

  data.forEach((item) => {
    if (item.type) {
      uniqueExtractedWords.add(item.type);
    }
    if (item.secondType) {
      uniqueExtractedWords.add(item.secondType);
    }
  });

  const uniqueWordsArray = Array.from(uniqueExtractedWords);

  const addKeyToFilter = (element) => {
    if (keyWordsForFiltring.includes(element)) {
      const updatedKeywords = keyWordsForFiltring.filter(
        (item) => item !== element
      );
      setKeyWordsForFiltring(updatedKeywords);
    } else {
      setKeyWordsForFiltring([...keyWordsForFiltring, element]);
    }
  };

  const handleLike = () => {
    setHasLiked(!hasLiked);

    const likedItems = dataLike.filter(
      (item) => item.like === true && item.page === page
    );

    const likeSet = new Set(likedItems.map((item) => item.id));

    const filteredData = data.filter((item) => likeSet.has(item.id));
    if (!hasLiked) {
      if (page === "blog") {
        dispatch(searchedPostsData(filteredData));
      } else {
        dispatch(searchedShopData(filteredData));
      }
    }
  };
  useEffect(() => {
    const filteredData = data.filter((item) => {
      for (const keyword of keyWordsForFiltring) {
        if (item.type === keyword || item.secondType === keyword) {
          return true;
        }
      }
      return false;
    });

    setHasLiked(false);

    if (page === "blog") {
      dispatch(searchedPostsData(filteredData));
    } else {
      dispatch(searchedShopData(filteredData));
    }

    dispatch(postsScrollToUpAction(keyWordsForFiltring));
  }, [keyWordsForFiltring, data]);

  return (
    <View
      style={[styles.container, { marginLeft: page === "shop" && useWidth(768)? 200 : 0 }]}
    >
      <View style={[styles.keysContainer]}>
        {dataLike.length > 0 && (
          <Pressable key="likeButton" onPress={handleLike}>
            {({ pressed, hovered }) => (
              <Text
                style={[
                  styles.title,
                  {
                    color: hasLiked
                      ? selectedTheme.tint
                      : selectedTheme.iconColors,
                    borderColor: selectedTheme.borderLine,
                  },
                  Platform.select({
                    web: {
                      transform: hovered ? [{ scale: 1.2 }] : [{ scale: 1 }],
                    },
                  }),
                  pressed && {
                    transform: [{ scale: 0.9 }],
                    opacity: 0.8,
                  },
                ]}
              >
                {message}
              </Text>
            )}
          </Pressable>
        )}
        {uniqueWordsArray.map((element, index) => (
          <Pressable key={index} onPress={() => addKeyToFilter(element)}>
            {({ pressed, hovered }) => (
              <Text
                style={[
                  styles.title,
                  {
                    color: keyWordsForFiltring.includes(element)
                      ? selectedTheme.borderBottomLine
                      : selectedTheme.iconColors,
                    borderColor: selectedTheme.borderLine,
                  },
                  Platform.select({
                    web: {
                      transform: hovered ? [{ scale: 1.2 }] : [{ scale: 1 }],
                    },
                  }),
                  pressed && {
                    transform: [{ scale: 0.9 }],
                    opacity: 0.8,
                  },
                ]}
              >
                {String(element)}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginHorizontal: 12,
    fontSize: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  keysContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: 24,
  },
});

export default AllFilterComponent;
