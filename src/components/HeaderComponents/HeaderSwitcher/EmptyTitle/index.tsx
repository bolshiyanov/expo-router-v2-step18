import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";

const EmptyTitle = ({ page }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  let message = "";
  if (page === "blog") {
    message = __("Blog");
  } else {
    message = __("Shop");
  }
  return (
    <>
      <View>
        <Text style={[styles.text, { color: selectedTheme.text }]}>
          {message}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginHorizontal: 12,
  },
  searchContainer: {
    marginHorizontal: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default EmptyTitle;
