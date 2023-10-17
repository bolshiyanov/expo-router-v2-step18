import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency } from "config";

import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { CartOrder } from "@/constants/types/orderType";
import BlogPagesComponent from "@/components/routesCompponents/BlogComponents/BlogPagesComponent";

const ChecoutLeftItem = ({ langPage, order }) => {
  const massage = __("QUANTITY:");
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const isMiddle = useWidth(768);

  useEffect(() => {
  }, [order]);

  if (!order || !order.cart || order.cart.length === 0) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingLeft: isMiddle ? 12 : 24,
          alignItems: isMiddle ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View key={order.id} style={[styles.container]}>
        {order.cart.map((item, index) => (
          <View
            key={index}
            style={[
              styles.card,
              { borderBottomColor: selectedTheme.borderLine },
            ]}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={[styles.rightContainer, {}]}>
              <View style={[styles.flexColumnContainer, {}]}>
                <View style={[styles.flexRowContainer, {}]}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                      styles.title,
                      {
                        color: selectedTheme.text,
                        fontSize: isMiddle ? 22 : 14,
                        lineHeight: isMiddle ? 22 : 14,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.price,
                      {
                        color: selectedTheme.text,
                        fontSize: isMiddle ? 24 : 18,
                      },
                    ]}
                  >
                    {currency}
                    {item.price.toFixed(2)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.quantity,
                    {
                      borderColor: selectedTheme.borderLine,
                      backgroundColor: selectedTheme.backgroundNav,
                      color: selectedTheme.text,
                    },
                  ]}
                >
                  {massage} {item.number}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    width: "100%",
  },
  container: {
    maxWidth: 500,
    width: "100%",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
    borderBottomWidth: 1,
  },
  image: {
    aspectRatio: 1,
    height: 90,
  },
  rightContainer: {
    flex: 1,
    width: "100%",
    height: 98,
  },
  flexColumnContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 2,
  },
  flexRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  price: {
    marginRight: 12,
    fontWeight: "600",
    fontSize: 28,
  },
  quantity: {
    width: 110,
    fontSize: 12,
    padding: 4,
    paddingBottom: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 12,
    textAlign: "center",
  },
});

export default ChecoutLeftItem;
