import { StyleSheet, View, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

import { useWidth } from "@/components/utils/useWidth";
import { useDispatch } from "react-redux";
import CheckOutTextComponent from "../../../ui/TitleSubtitleComponent";
import NumberInRoundTextComponent from "@/components/ui/NumberInRoundTextComponent";

import PressableButton from "@/components/common/PressableButton";
import { RemoveAllInProgressBarAction } from "@/store/reducers/ProgressBarSlice";
import { removeOrder, saveOrder } from "@/store/reducers/OrdersSlice";
import { useRouter } from "expo-router";
import { cartAllRemove } from "@/store/reducers/CartSlice";

const CheckoutRightPayment = ({ order }) => {
  const [shonButton, setShonButton] = useState(true);
  const router = useRouter();
  const paymentTitle = __("Payment");
  const paymentSubtitle = __("Select a payment method");
  const wireTransferTitle = __("Wire transfer");
  const wireTransferSubtitle = __(
    "Upon order confirmation, you’ll receive instructions to complete payment."
  );

  const placeOrderTitle = __("Place order");

  const dispatch = useDispatch();

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const payment = useAppSelector((state) => state.progressBarSlice.payment);

  const number3 = 3;
  const fontSize18 = 18;
  const fontSize22 = 22;

  const placeOrder = () => {
    dispatch(RemoveAllInProgressBarAction());
    dispatch(saveOrder({ id: order.id }));
    dispatch(removeOrder({ id: order.id }));
    //dispatch(cartAllRemove());
    router.replace("/order");
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={{ marginTop: 2 }}>
            <NumberInRoundTextComponent
              number={number3}
              active={payment}
              fontSize={fontSize22}
            />
          </View>
          <CheckOutTextComponent
            title={paymentTitle}
            subTitle={paymentSubtitle}
            active={payment}
            border={false}
            fontSize={fontSize18}
          />
        </View>
        <View style={{ marginTop: 24 }} />
        <View style={{ marginRight: 12, marginLeft: 50 }}>
          {payment && (
            <View
              style={[
                styles.button,
                {
                  borderColor: selectedTheme.tint,
                  backgroundColor: selectedTheme.backgroundNav,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.buttonText,
                  {
                    color: selectedTheme.text,
                    fontWeight: "500",
                  },
                ]}
              >
                {wireTransferTitle}
              </Text>
              <View style={styles.detailsContainer}>
                <Text
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={{
                    color: selectedTheme.subTitle,
                    fontWeight: "300",
                    fontSize: 11,
                  }}
                >
                  {wireTransferSubtitle}
                </Text>
              </View>
            </View>
          )}

          {shonButton && payment && (
            <PressableButton onPress={placeOrder} title={placeOrderTitle} />
          )}
        </View>
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
  button: {
    flexDirection: "column",
    height: 80,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    justifyContent: "flex-start",
  },
});

export default CheckoutRightPayment;
