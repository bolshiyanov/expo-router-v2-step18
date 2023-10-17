import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";

import { StyleSheet, Platform, View, Pressable, Text } from "react-native";

import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { useRouter } from "expo-router";

const OrderButtonComponent = () => {
  const customer = useAppSelector((state) => state.progressBarSlice.customer);
  const dataCart = useAppSelector((state) => state.cartSlice);
  const currentPage = useAppSelector(
    (state) => state.currentPageSlice.currentPage
  );
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const isOpenCheckOut = () => {
    router.replace("/checkout");
  };

  if (!customer || currentPage === "checkout" || dataCart.length > 0) {
    return null;
  }
  return (
    <View
      style={[
        {
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: 9,
          right: 58,
          height: 40,
          width: 40,
          borderRadius: 5,
          backgroundColor: selectedTheme.transporentButton,
        },
        Platform.select({
          ios: { top: 45, right: 56, height: 35, width: 35, padding: 2 },
        }),
      ]}
    >
      <Pressable onPress={isOpenCheckOut}>
        {({ pressed, hovered }) => (
          <TabBarIcon
            color={selectedTheme.iconColors}
            style={[
              {},
              Platform.select({
                web: {
                  transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                },
              }),
              pressed && {
                transform: [{ scale: 0.9 }],
                opacity: 0.8,
              },
            ]}
            name='wallet'
          />
        )}
      </Pressable>
      <Pressable onPress={isOpenCheckOut} style={styles.numberContainer}>
        
          <Text style={styles.number}>!</Text>
        
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  numberContainer: {
    position: "absolute",
    top: 0,
    display: "flex",
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 18,
    height: 18,
    backgroundColor: "red",
    borderRadius: 9,
  },
  number: {
    color: "white",
    fontSize: 10,
  },
});

export default OrderButtonComponent;
