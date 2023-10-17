import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency } from "config";

import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

const TitleSubtitleComponent = ({ title, subTitle, active, border, fontSize }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isMiddle = useWidth(768);

  return (
    <View style={[styles.container, {}]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.text,
          {
            color: active? selectedTheme.text : selectedTheme.borderLine,
            fontSize: fontSize,
          },
        ]}
      >
        {title}
      </Text>
      {subTitle !== "" && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.text,
            {
              color: active? selectedTheme.subTitle : selectedTheme.borderLine,
              fontSize: fontSize - 2,
            },
          ]}
        >
          {subTitle}
        </Text>
      )}
      {border && (
        <View
          style={[
            styles.separador,
            {
              borderBottomColor: selectedTheme.borderLine,
            },
          ]}
        ></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  text: {
    fontWeight: "500",
    paddingHorizontal: 12,
  },
  separador: {
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    textAlign: "left",
  },
});

export default TitleSubtitleComponent;
