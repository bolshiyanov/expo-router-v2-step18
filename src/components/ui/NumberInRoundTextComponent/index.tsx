import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { baseGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";
import BlogPagesComponent from "@/components/routesCompponents/BlogComponents/BlogPagesComponent";
import Colors from "config";
import { useAppSelector } from "@/components/utils/hooks/redux";
const NumberInRoundTextComponent = ({ number, active, fontSize }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const sizeBox = fontSize + 6;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: active
            ? selectedTheme.tint
            : selectedTheme.borderLine,
          height: sizeBox,
          width: sizeBox,
          borderRadius: sizeBox / 2,
        },
      ]}
    >
      <Text
        style={{
          color: active ? selectedTheme.text : selectedTheme.subTitle,
          fontSize: fontSize-6,
          fontWeight: active ? "600" : "100",
          
        }}
      >
        {number}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",

  },
});

export default NumberInRoundTextComponent;
