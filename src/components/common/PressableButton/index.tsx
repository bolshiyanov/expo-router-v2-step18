import { StyleSheet, Pressable, Text, Platform } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "@/components/utils/hooks/redux";

import Colors from "config";

const PressableButton = ({onPress, title}) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;


  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.checkoutButton,
        {
          backgroundColor: selectedTheme.subTitle,
          borderColor: selectedTheme.borderLine,
        },
      ]}
    >
      {({ pressed, hovered }) => (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            Platform.select({
              web: {
                transform: hovered ? [{ scale: 1.05 }] : [{ scale: 1 }],
              },
            }),
            pressed && {
              transform: [{ scale: 0.95 }],
              opacity: 0.7,
            },
            styles.buttonText,
            {
              color: selectedTheme.backgroundNav,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
    checkoutButton: {
        width: "100%",
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 48,
        marginTop: 12,
        paddingHorizontal: 6,
      },
      buttonText: {
        fontWeight: "600",
      },
});

export default PressableButton;
