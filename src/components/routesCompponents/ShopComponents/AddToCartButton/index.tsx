import { StyleSheet, Text, Pressable, Platform, View } from "react-native";
import React, { useEffect, useState } from "react"; // Import 'useState'
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors from "config";
import { cartAdd } from "@/store/reducers/CartSlice";
import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { cns } from "@/components/utils/cns";
import cssStyles from "@/components/navigatorComponents/root-layout.module.scss";

const isItemInCart = (cart, itemId) => {
  return cart.some((cartItem) => cartItem.id === itemId);
};

const AddToCartButton = ({ id, name, image, price }) => {
  const addToCart = __("Add to the cart");
  const notAvailable = __("Not available");
  const AddedToCartText = __("Already added to the cart");

  const cart = useAppSelector((state) => state.cartSlice);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const availableInStockData = useAppSelector(
    (state) => state.availableInStock
  );
  const item = availableInStockData.find((item) => item.id === id);
  const isMiddle = useWidth(768);

  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    const itemInCart = isItemInCart(cart, id);
    setItemInCart(itemInCart);
  }, [cart, id]);

  const dispatch = useAppDispatch();

  useEffect(() => {}, [item]);

  if (!item) {
    return null;
  }

  const addToCartEvent = () => {
    if (item.available > 0) {
      dispatch(cartAdd({ id: item.id, name, image, price }));
      dispatch(currentPageChangeAction("shop"));
    }
  };

  return (
    <>
      {!itemInCart ? (
        <View style={{ maxWidth: 220 }}>
          <Pressable
            style={[
              Platform.select({
                web: cns(cssStyles.glowOnHover),
              }),
            ]}
            onPress={addToCartEvent}
          >
            {({ pressed, hovered }) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  Platform.select({
                    web: {
                      transform: [
                        { scale: hovered ? 1.03 : 1 },
                        { scale: pressed ? 0.95 : 1 },
                      ],
                      transition: "transform 0.5s",
                      boxShadow: pressed
                        ? "0px 0px 10px rgba(0, 0, 0, 0.4)" // Shadow on press
                        : "none", // No shadow when not pressed
                    },
                    android: {
                      elevation: pressed ? 6 : 0, // Elevation on press
                    },
                  }),
                  styles.button,
                  {
                    color: selectedTheme.text,
                    fontSize: isMiddle ? 16 : 12,
                    width: isMiddle ? 220 : 140,
                    height: isMiddle ? 50 : 38,
                    backgroundColor: selectedTheme.backgroundSecond,
                    borderColor: selectedTheme.backgroundNav,
                  },
                ]}
              >
                {item.available > 0 ? addToCart : notAvailable}
              </Text>
            )}
          </Pressable>
        </View>
      ) : (
        <View style={{ maxWidth: 220 }}>
          <Pressable
            style={[
              Platform.select({
                web: cns(cssStyles.glowOnHover),
              }),
            ]}
            onPress={() => {}}
          >
            {({ pressed, hovered }) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  Platform.select({
                    web: {
                      transform: [
                        { scale: hovered ? 1.03 : 1 },
                        { scale: pressed ? 0.95 : 1 },
                      ],
                      transition: "transform 0.5s",
                      boxShadow: pressed
                        ? "0px 0px 10px rgba(0, 0, 0, 0.4)" // Shadow on press
                        : "none", // No shadow when not pressed
                    },
                    android: {
                      elevation: pressed ? 6 : 0, // Elevation on press
                    },
                  }),
                  styles.button,
                  {
                    color: selectedTheme.tint,
                    fontSize: isMiddle ? 12 : 8,
                    width: isMiddle ? 220 : 140,
                    height: isMiddle ? 50 : 38,
                    backgroundColor: selectedTheme.backgroundSecond,
                    borderColor: selectedTheme.backgroundNav,
                  },
                ]}
              >
                {AddedToCartText}
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginLeft: 6,
  },

  button: {
    fontWeight: "500",
    padding: 5,
    textAlign: "center",
    borderWidth: 1,
    cursor: "pointer",
    position: "relative",
    zIndex: 0,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  },
});

export default AddToCartButton;
