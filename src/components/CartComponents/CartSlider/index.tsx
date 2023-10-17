import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import {
  CartSliderIsOpenAction,
  CartSliderIsClosedAction,
} from "@/store/reducers/CartSlider";
import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Colors from "config";
import CartListComponent from "../CartListComponent";
import { useWidth } from "@/components/utils/useWidth";

const CartSlider = ({ size, langPage }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const currentPage = useAppSelector(
    (state) => state.currentPageSlice.currentPage
  );
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const isMiddle = useWidth(768);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cartSliderSlice.isOpen);

  
  console.log('currentPage ', currentPage)
  const isOpenSlider = () => {
    if (!isOpen) {
      dispatch(CartSliderIsOpenAction());
      console.log('currentPage ', currentPage)
    } else {
      dispatch(CartSliderIsClosedAction());
      console.log('currentPage ', currentPage)
    }
  };

  return (
    <>
      <View
        style={[
          styles.sliderContainerForCategories,
          {
            height: isOpen ? "100%" : 0,
            backgroundColor: selectedTheme.transporentButton,
          },
        ]}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.menuForCategories,
              {
                right: isOpen ? 0 : -330,
                top:
                  (currentPage === "shop" && isMiddle) ||
                  (currentPage === "blog" && isMiddle)
                    ? -120
                    : -60,
              },
            ]}
          >
            <CartListComponent size={size} langPage={langPage} />
          </Animated.View>
          <TouchableOpacity
            onPress={isOpenSlider}
            style={{
              position: "absolute",
              right: isMiddle ? 530 : 330,
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </View>
    </>
  );
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
   
  },
  sliderContainerForCategories: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 3,
  },
  menuForCategories: {
    position: "absolute",
    top: -60,
    right: -330,
    width: 330,
    height: "100%",
    
  },
});

export default CartSlider;
