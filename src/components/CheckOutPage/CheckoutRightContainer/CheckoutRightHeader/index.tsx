import { StyleSheet, View, Text } from "react-native";
import React from "react";
import TitleSubtitleComponent from "../../../ui/TitleSubtitleComponent";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";



  const CheckoutRightHeader = ({ langPage, order }) => {

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light; 
  

  const checkoutPage = __("Checkout");

  const fontSize12 = 12;

  const fontSize32 = 32;


  return (
    <>
      <View style={styles.contentContainer}>
        <TitleSubtitleComponent
          title={checkoutPage}
          subTitle=""
          active={true}
          border={true}
          fontSize={fontSize32}
        />
      </View>
      <View style={[styles.contentContainer, { marginTop: -54 }]}>
        <TitleSubtitleComponent
          title={order.orderNumber}
          border={false}
          active={true}
          subTitle=""
          fontSize={fontSize12}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
  },
  contentContainer: {
    display: "flex",
    width: "100%",
    height: 60,
    maxWidth: 500,
    flexDirection: "column",
    margin: 12,
    justifyContent: "flex-start",
  },
});

export default CheckoutRightHeader;
