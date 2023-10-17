import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { addDeliveryOptions } from "@/store/reducers/OrdersSlice";
import Colors, { currency } from "config";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DeliveryChoiceButton = ({
  deliveryId,
  deliveryCompanyName,
  shippingPrice,
  deliveryTime,
  order,
}) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const payment = useAppSelector((state) => state.progressBarSlice.payment);
  const currentDeliveryId = order.deliveryId;

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    dispatch(
      addDeliveryOptions({
        id: order.id,
        deliveryId,
        deliveryCompanyName,
        shippingPrice,
        deliveryTime,
      })
    );
  }, [isPressed]);

  const dispatch = useAppDispatch();


  const buttonStyles = {
    borderColor:
      deliveryId === currentDeliveryId && !payment
        ? selectedTheme.tint
        : selectedTheme.borderLine,
    backgroundColor:
      deliveryId === currentDeliveryId
        ? selectedTheme.backgroundNav
        : selectedTheme.backgroundSecond,
  };

  if (deliveryId !== currentDeliveryId && payment
    ) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles]}
      onPress={() => setIsPressed(!isPressed)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[
          styles.buttonText,
          {
            color:
              deliveryId === currentDeliveryId
                ? selectedTheme.text
                : selectedTheme.subTitle,
            fontWeight:
              deliveryId === currentDeliveryId && !payment ? "500" : "300",
          },
        ]}
      >
        {deliveryCompanyName}
      </Text>
      <View style={styles.detailsContainer}>
        <Text
          style={{
            color:
              deliveryId === currentDeliveryId && !payment
                ? selectedTheme.text
                : selectedTheme.subTitle,
                fontWeight:
                deliveryId === currentDeliveryId && !payment ? "500" : "300",
          }}
        >
          Delivery time: {deliveryTime} days
        </Text>
        <Text
          style={{
            color:
              deliveryId === currentDeliveryId
                ? selectedTheme.text
                : selectedTheme.subTitle,
            fontWeight:
              deliveryId === currentDeliveryId && !payment ? "500" : "300",
          }}
        >
          Price: {currency}
          {shippingPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    height: 80,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  buttonText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 16,
  },
  detailsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DeliveryChoiceButton;
