import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import CategoriesMenuComponent from "@/components/routesCompponents/ShopComponents/CategoriesMenuComponent";
import {
  CategoriesSliderIsOpenAction,
  CategoriesSliderIsClosedAction,
} from "@/store/reducers/CategoriesSlider";
import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Colors from "config";

const CategoriesSlider = ({ langPage }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.categoriesSliderSlice.isOpen);

  const isOpenSlider = () => {
    if (!isOpen) {
      dispatch(CategoriesSliderIsOpenAction());
    } else {
      dispatch(CategoriesSliderIsClosedAction());
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
              style={[styles.menuForCategories, { left: isOpen ? 0 : -180 }]}
            >
              <CategoriesMenuComponent langPage={langPage} />
            </Animated.View>
            <TouchableOpacity
              onPress={isOpenSlider}
              style={{
                position: "absolute",
                left: 180,
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
    zIndex: 1,
  },
  menuForCategories: {
    position: "absolute",
    top: -60,
    left: -180,
    width: 180,
    height: "100%",
  },
});

export default CategoriesSlider;
