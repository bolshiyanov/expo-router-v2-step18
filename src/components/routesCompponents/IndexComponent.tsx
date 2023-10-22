import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import {
  StyleSheet,
  Text,
  View,
 
} from "react-native";
import Colors from "config";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";
import { useEffect, useRef } from "react";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import HomeFirstScreen from "../HomeScreens/HomeFirstScreen";

import CartSlider from "../CartComponents/CartSlider";
import { useWidth } from "../utils/useWidth";
import HomeSecondScreen from "../HomeScreens/HomeSecondScreen";

export default function IndexComponent({ langPage }) {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isMiddle = useWidth(768);
  const dispatch = useAppDispatch();

  const iscartSliderOpen = useAppSelector(
    (state) => state.cartSliderSlice.isOpen
  );

  useEffect(() => {
    dispatch(currentPageChangeAction("index"));
  }, []);

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <CartSlider size={isMiddle ? "middle" : "small"} langPage={langPage} />

        <View style={styles.main}>
          <HomeFirstScreen />
          <HomeSecondScreen />
          
        </View>
      </View>
      <FooterComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",

    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  background: {
    position: "absolute",
    width: 1920,
    height: 1920,
    top: 0,
    opacity: 0.7,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],
  },
});
