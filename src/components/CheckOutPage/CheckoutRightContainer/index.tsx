import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency } from "config";

import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

import CheckoutRightHeader from "./CheckoutRightHeader";
import { OrderTypeInterface } from "@/constants/types/orderType";
import CheckoutRightProgressBar from "./CheckoutRightProgressBar";
import CheckoutRightBilling from "./CheckoutRightBilling";
import CheckoutRightDelivery from "./CheckoutRightDelivery";
import CheckoutRightPayment from "./CheckoutRightPayment";

interface CheckoutRightContainerProps {
    langPage: any;
    order: OrderTypeInterface | undefined; // Define the 'order' prop here
  }

  const CheckoutRightContainer: React.FC<CheckoutRightContainerProps> = ({ langPage, order }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const isMiddle = useWidth(768);
  return (
    <View
      style={[
        styles.nestedContainer,
        {
          paddingLeft: 0,
          paddingRight: 12,
          width: !isMiddle ? "100%" : "50%",
          height: "100%",
          backgroundColor: selectedTheme.backgroundSecond
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        
        <CheckoutRightHeader langPage={langPage} order={order}/>
        <CheckoutRightProgressBar/>
        <View style= {{height: 36}}/>
        <CheckoutRightBilling order={order}/>
        <CheckoutRightDelivery order={order}/>
        <CheckoutRightPayment order={order} />
        <View style= {{height: 336}}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  nestedContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default CheckoutRightContainer;
