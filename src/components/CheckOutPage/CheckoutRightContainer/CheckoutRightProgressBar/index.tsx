import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

const CheckoutRightProgressBar = () => {
  const orderTitile = __("Order")
  const customerTitle = __("Customer")
  const paymentTitle = __("Payment")
  const deliveryTitle = __("Delivery")
  
  const customer = useAppSelector((state) => state.progressBarSlice.customer);
  const delivery = useAppSelector((state) => state.progressBarSlice.delivery);
  const payment = useAppSelector((state) => state.progressBarSlice.payment);

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;


  return (
    <>
      <View style={styles.contentContainer}>
      <Text
          style={{
            color:selectedTheme.tint,
            fontWeight:  '600',
          }}
        >
          {orderTitile} &gt;{" "}
        </Text>
        <Text
          style={{
            color: customer
              ? selectedTheme.tint
              : selectedTheme.borderLine,
            fontWeight: customer ? '600' : '300',
          }}
        >
          {customerTitle} &gt;{" "}
        </Text>

        <Text
          style={{
            color: delivery
              ? selectedTheme.tint
              : selectedTheme.borderLine,
            fontWeight: delivery ? '600' : '300',
          }}
        >
          {deliveryTitle}  &gt;{" "}
        </Text>

        <Text
          style={{
            color: payment
              ? selectedTheme.tint
              : selectedTheme.borderLine,
            fontWeight: payment ? '600' : '300',
          }}
        >
          {paymentTitle} {" "}
        </Text>
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 500,
    flexDirection: "row",
    marginHorizontal: 24,
    justifyContent: "flex-start",
  },
});

export default CheckoutRightProgressBar;
