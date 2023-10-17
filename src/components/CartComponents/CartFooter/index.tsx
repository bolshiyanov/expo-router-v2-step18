import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency } from "config";

import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import CartPromo from "../CartPromo";

interface CartItem {
    id: string;
    numbers: number;
    price: number;
}



const CartFooter = ({ langPage }) => {
  const Subtotal = __("Subtotal");
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isMiddle = useWidth(768);

  const dataCart = useAppSelector((state) => state.cartSlice);
  const shopData = useAppSelector((state) => state.shopData);

  let order = dataCart.map((dataItem) => {
    const matchingShopItem = shopData.find(
      (shopItem) => shopItem.id === dataItem.id
    );

    if (matchingShopItem) {
      return {
        id: dataItem.id,
        numbers: dataItem.number,
        price: matchingShopItem.price,
      };
    }

    return null;
  });

  order = order.filter((item) => item !== null && item !== undefined);

  function subtotal(cartItems: CartItem[]): number {
    const total = cartItems.reduce((accumulator, currentItem) => {
        const itemTotal = currentItem.numbers * currentItem.price;
        return accumulator + itemTotal;
    }, 0);

    return total;
}

const totalAmount = subtotal(order);
  
  
  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.flexRowContainer, {}]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            textAlign: "right",
            marginRight: 12,
            color: selectedTheme.subTitle,
            fontSize: isMiddle ? 24 : 16,
          }}
        >
          {Subtotal}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            textAlign: "right",
            marginRight: 12,
            color: selectedTheme.subTitle,
            fontSize: isMiddle ? 24 : 16,
          }}
        >
          {currency}
          {totalAmount.toFixed(2)}
        </Text>
      </View>
      <CartPromo totalAmount={totalAmount} langPage={langPage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 12,
    marginBottom: 48,
  },
  flexRowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
  },
});

export default CartFooter;
