import { StyleSheet, Text, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react"; // Import 'useState'
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors from "config";
import { cartAdd } from "@/store/reducers/CartSlice";
import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";

const isItemInCart = (cart, itemId) => {
  return cart.some((cartItem) => cartItem.id === itemId);
};

const AddToCartButton = ({ id, name, image, price }) => {
  const addToCart = "Add to the cart";
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
        <Pressable style={styles.buttonContainer} onPress={addToCartEvent}>
          {({ pressed, hovered }) => (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                Platform.select({
                  web: {
                    transform: hovered ? [{ scale: 1.03 }] : [{ scale: 1 }],
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
                  color: item.available > 0 ? selectedTheme.tint : "red",
                  borderColor:
                    item.available > 0 ? selectedTheme.borderLine : "red",
                  fontSize: isMiddle ? 16 : 13,
                },
              ]}
            >
              {item.available > 0 ? addToCart : notAvailable}
            </Text>
          )}
        </Pressable>
      ) : (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: selectedTheme.borderBottomLine, marginLeft: 16 }}
        >
          {AddedToCartText}
        </Text>
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
    fontSize: 14,
    fontWeight: "600",
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: "center",
  },
});

export default AddToCartButton;
