import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";

import Colors from "config";

const CategoryFirstScreen = ({ smallText }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const shopData = useAppSelector((state) => state.shopData);

  const categoryArray = useAppSelector(
    (state) => state.categorySlice.categories
  );

  const currentId = useAppSelector(
    (state) => state.categorySlice.checkedIdCategory
  );

  const currentName = useAppSelector(
    (state) => state.categorySlice.checkedNameCategory
  );

  const firstScreen = categoryArray.find(
    (item) => item.categoryId === currentId
  );

  if (currentId !== "null" && currentId !== "") {
    if (firstScreen.image) {
      return (
        <View>
          <Image
            style={styles.originalImage}
            source={{ uri: firstScreen.image }}
          />
          <View
            style={[
              styles.textContainer,
              { backgroundColor: selectedTheme.transporentBackGround },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: selectedTheme.transporentButton,
                  fontSize: smallText ? 32 : 64,
                  textShadowOffset:{ width: 0, height: 0 },
                   
                  textShadowColor: selectedTheme.text,
                  textShadowRadius: 7
                },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {currentName}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }
  return null;
};

const styles = StyleSheet.create({
  originalImage: {
    width: "100%",
    aspectRatio: 24 / 9,
    alignSelf: "center",
  },

  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    // Радиус размытия
  },
});

export default CategoryFirstScreen;
