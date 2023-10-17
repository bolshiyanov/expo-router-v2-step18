import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { themeChangeAction } from "@/store/reducers/ThemeSlice";
import Colors from "config";

import { StyleSheet, Platform, View, Pressable, Text } from "react-native";

import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { fetchCartData } from "@/store/reducers/CartSlice";
import { fetchShopData } from "@/store/reducers/ShopDataSlice";
import uniqueData from "@/components/utils/uniqueData";
import { fetchRestOfStockData } from "@/store/reducers/AvailableInStoskSlice";
import {
  CartSliderIsClosedAction,
  CartSliderIsOpenAction,
} from "@/store/reducers/CartSlider";

const CartButtonComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchShopData());
  }, []);
  const [sum, setSum] = useState(0);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isOpen = useAppSelector((state) => state.cartSliderSlice.isOpen);
  const dataCart = useAppSelector((state) => state.cartSlice);
  const shopData = useAppSelector((state) => state.shopData);
  const currentPage = useAppSelector(
    (state) => state.currentPageSlice.currentPage
  );

  //Counting Rest Of Stock all items with consideration data in local storage
  // Create array id, quantity in shopData
  const restInJson = shopData.map((item) => ({
    id: item.id,
    available: item.inStock,
  }));

  // Create array id, quantity in shopData
  const restInLocalStorage = dataCart.map((item) => ({
    id: item.id,
    number: item.number,
  }));

  // Create array available bslsnce

  function calculateAvailableBalance(restInJson, restInLocalStorage) {
    // Create a map of id to quantity from restInLocalStorage for quick lookup
    const quantityMap = restInLocalStorage.reduce((acc, item) => {
      acc[item.id] = item.number;
      return acc;
    }, {});

    // Calculate available balance for each item
    const availableBalance = restInJson.map((item) => {
      const id = item.id;
      const inStock = item.available;
      const numberInCart = quantityMap[id] || 0; // Get the quantity from local storage or default to 0
      const available = inStock - numberInCart;
      return { id, available };
    });

    return availableBalance;
  }

  const availableBalance = uniqueData(
    calculateAvailableBalance(restInJson, restInLocalStorage)
  );

  useEffect(() => {
    if (restInLocalStorage.length !== 0) {
      dispatch(fetchRestOfStockData(availableBalance));
    } else {
      dispatch(fetchRestOfStockData(uniqueData(restInJson)));
    }
  }, [dataCart, shopData]);

  //Calculate quantity of items in the cart for indicate in top button
  useEffect(() => {
    const arrayOfObjects = dataCart;
    let sum = 0;

    for (const obj of arrayOfObjects) {
      if (obj.hasOwnProperty("number")) {
        sum += obj.number;
        setSum(sum);
      }
    }
  }, [dataCart]);

  const isOpenSlider = () => {
    if (!isOpen) {
      dispatch(CartSliderIsOpenAction());
    } else {
      dispatch(CartSliderIsClosedAction());
    }
  };

  if (sum === 0 || dataCart.length === 0) {
    return null;
  }

  if (currentPage === "checkout") {
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
      <Pressable onPress={isOpenSlider}>
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
            name="cart"
          />
        )}
      </Pressable>
      <Pressable style={styles.numberContainer} onPress={isOpenSlider}>
        <Text style={styles.number}> {sum}</Text>
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
    paddingRight: 2,
  },
});

export default CartButtonComponent;
