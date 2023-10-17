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
import ChecoutLeftCHeader from "./ChecoutLeftHeader";
import ChecoutLeftItem from "./ChecoutLeftItem";
import ChecoutLeftFooter from "./ChecoutLeftFooter";
import { OrderTypeInterface } from "@/constants/types/orderType";

interface CheckoutLeftContainerProps {
  langPage: any;
  order: OrderTypeInterface | undefined;
}
const CheckoutLeftContainer: React.FC<CheckoutLeftContainerProps> = ({ langPage, order }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const isMiddle = useWidth(768);
  
  return (
    <View
      style={[
        styles.nestedContainer,
        {
          paddingLeft: !isMiddle ? 0 : 12,
          paddingRight: !isMiddle ? 24 : 0,
          width: !isMiddle ? "100%" : "50%",
          minHeight: !isMiddle ? 10 : "100%",
          backgroundColor: isMiddle? selectedTheme.background : selectedTheme.backgroundSecond
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        
          <ChecoutLeftCHeader /> 
          <ChecoutLeftItem langPage={langPage} order={order}/> 
           <ChecoutLeftFooter langPage={langPage} order={order}/>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  nestedContainer: {
    display: "flex",
    height: 600,
    flexDirection: "column",
    justifyContent: "flex-start",
   
  },
});

export default CheckoutLeftContainer;
