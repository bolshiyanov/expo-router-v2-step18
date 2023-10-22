import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import { useRouter } from "expo-router";
import Colors from "config";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { cartAllRemove, fetchCartData } from "@/store/reducers/CartSlice";
import { CartSliderIsClosedAction } from "@/store/reducers/CartSlider";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { useWidth } from "@/components/utils/useWidth";

const CartHeader = () => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const currentPage = useAppSelector(
    (state) => state.currentPageSlice.currentPage
  );
  const shoppingCart = __("My shoping bag");
  const isMiddle = useWidth(768);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const removeAllCart = () => {
    dispatch(cartAllRemove());
    dispatch(CartSliderIsClosedAction());
    dispatch(currentPageChangeAction(""));
  };

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: selectedTheme.borderLine },
      ]}
    >
      <View style={styles.headerTitleContainer}>
        <TabBarIcon
          color={selectedTheme.iconColors}
          style={{ fontSize: 36 }}
          name="logo-small"
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.title, { color: selectedTheme.text }]}
        >
          {shoppingCart}
        </Text>
      </View>

      {isMiddle && (
        <Pressable onPress={removeAllCart}>
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
              name="trash"
            />
          )}
        </Pressable>
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  headerTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    textTransform: "uppercase",
    marginLeft: 12,
    marginTop: 3,
  },
});

export default CartHeader;
