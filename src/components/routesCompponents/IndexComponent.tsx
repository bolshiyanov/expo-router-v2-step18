import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  ImageBackground,
  ImageURISource,
} from "react-native";
import Colors from "config";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";
import { useEffect, useRef } from "react";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import HomeFirstScreen from "../HomeScreens/HomeFirstScreen";
import backgroundImage from "@/assets/images/backgrondAnimated.jpg";
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from "@/constants/types/backgroundAnumatedConst";
import CartSlider from "../CartComponents/CartSlider";
import { useWidth } from "../utils/useWidth";

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

  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
  const source = backgroundImage as ImageURISource;
  return (
    <ScrollView>
      
        
      <View
        style={[
          styles.container,
          { backgroundColor: selectedTheme.backgroundSecond },
        ]}
      >
       
        <CartSlider size={isMiddle ? "middle" : "small"} langPage={langPage}/>
        <AnimetedImage 
            resizeMode="repeat" 
            style={[styles.background,{
                transform: [
                    {
                      translateX: translateAnimation,
                    },
                    {
                      translateY: translateAnimation,
                    },
                  ],
            }]}
            source={source} />
        <View style={styles.main}>
          <HomeFirstScreen />
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
    opacity: 0.2,
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
