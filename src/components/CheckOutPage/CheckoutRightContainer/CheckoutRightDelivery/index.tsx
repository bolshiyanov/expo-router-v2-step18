import { StyleSheet, View, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

import { useWidth } from "@/components/utils/useWidth";
import { useDispatch } from "react-redux";
import CheckOutTextComponent from "../../../ui/TitleSubtitleComponent";
import NumberInRoundTextComponent from "@/components/ui/NumberInRoundTextComponent";

import { shippingArray } from "@/data/shippingArray";
import DeliveryChoiceButton from "@/components/ui/DeliveryChoiceButton";
import PressableButton from "@/components/common/PressableButton";
import { PaymentInProgressBarAction } from "@/store/reducers/ProgressBarSlice";

const CheckoutRightDelivery = ({ order }) => {
  const [shonButton, setShonButton] = useState(false);
  const deliveryTitle = __("Delivery");
  const continueToPayment = __("Continue to payment");
  const deliverySubtitle = __("Select a shipping method");
  const currentRegionId = order.currentRegionId;

  const deliveryObjects = shippingArray.find(
    (item) => item.id === currentRegionId
  );
  const deliveryOptions = deliveryObjects.deliveryOptions;
  const deliveryId = order.deliveryId;

  useEffect(() => {
    if (deliveryId !== "0") {
      setShonButton(true);
    }
  }, [order]);

  const dispatch = useDispatch();

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const delivery = useAppSelector((state) => state.progressBarSlice.delivery);
  const payment = useAppSelector((state) => state.progressBarSlice.payment);

  const number2 = 2;
  const fontSize18 = 18;
  const fontSize22 = 22;

  const addPaymentStatus = () => {
    dispatch(PaymentInProgressBarAction());
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={{ marginTop: 2 }}>
            <NumberInRoundTextComponent
              number={number2}
              active={delivery}
              fontSize={fontSize22}
            />
          </View>
          <CheckOutTextComponent
            title={deliveryTitle}
            subTitle={deliverySubtitle}
            active={delivery}
            border={false}
            fontSize={fontSize18}
          />
        </View>
        <View style={{ marginTop: 24 }} />
        {(delivery || payment) && (
          <View style={{ marginRight: 12, marginLeft: 50 }}>
            {deliveryOptions.map((item) => (
              <View key={item.deliveryId}>
                <DeliveryChoiceButton
                  deliveryId={item.deliveryId}
                  deliveryCompanyName={item.deliveryCompanyName}
                  shippingPrice={item.shippingPrice}
                  deliveryTime={item.deliveryTime}
                  order={order}
                />
              </View>
            ))}
            {shonButton && delivery && !payment && (
              <PressableButton
                onPress={addPaymentStatus}
                title={continueToPayment}
              />
            )}
            <View style={{ marginTop: -12 }} />
            <View
              style={{
                width: "100%",
                borderBottomColor: selectedTheme.borderLine,
                borderBottomWidth: 1,
                marginTop: 24,
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 500,
    flexDirection: "column",
    margin: 12,
    justifyContent: "flex-start",
  },
  headerContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 12,
  },
});

export default CheckoutRightDelivery;
