import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency, shippingArray } from "config";
import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import CustomModal from "@/components/common/CustomModal";
import PressableButton from "@/components/common/PressableButton";
import {
  addDiscountToOrder,
  addTotalAmountToOrder,
  checkOut,
} from "@/store/reducers/OrdersSlice";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { cartAllRemove } from "@/store/reducers/CartSlice";
import { discountData } from "config";
import { CustomerInProgressBarAction } from "@/store/reducers/ProgressBarSlice";

const ChecoutLeftItem = ({ langPage, order }) => {
  const subtotal = __("Subtotal");
  const tax = __("Tax");
  const shipping = __("Shipping ");
  const confirmOrderTitle = __("Confirm order");
  const yourDiscountIs = __("Your discount is");
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const currentPage = useAppSelector(
    (state) => state.currentPageSlice.currentPage
  );
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const customer = useAppSelector((state) => state.progressBarSlice.customer);
  const isMiddle = useWidth(768);
  const [currentTax, setCurrentTax] = useState(-1);
  const [currentShipping, setCurrentShipping] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(shippingArray[0].id);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCurrentShipping(order.shippingPrice);
    setCurrentTax(order.tax);
  }, [order]);

  useEffect(() => {
    if (selectedValue !== "0") {
      const selectedInPicker = shippingArray.find(
        (item) => item.id === selectedValue
      );
      if (selectedInPicker) {
        setCurrentShipping(selectedInPicker.shippingPrice);
        setCurrentTax(selectedInPicker.tax);
      }
    } else {
      setCurrentShipping(-1);
      setCurrentTax(-1);
    }
  }, [selectedValue, shippingArray]);

  useEffect(() => {
    if (order !== undefined) {
      const promoItem = discountData.find(
        (item) => item.code === order.currentCouponCode
      );
      if (promoItem) {
        const discountedAmount = promoItem.discount;
        setDiscount(discountedAmount);
        dispatch(addDiscountToOrder({ id: order.id, discount: discount }));
      }
    }
  }, [discount]);

  const dispatch = useAppDispatch();

  const confirmOrder = () => {
    if (order) {
      const lang = langPage; // Replace with the appropriate language code
      dispatch(cartAllRemove());
      dispatch(currentPageChangeAction(""));
      dispatch(CustomerInProgressBarAction());
    } else {
      // Handle the case where order or selectedValue is not valid
      console.error("Order or selectedValue is invalid.");
    }
  };

  let correctShippingPrice = 0;
  if (currentShipping > -1) {
    correctShippingPrice = currentShipping;
  }

  let correctTaxPercent = 0;
  if (currentTax > -1) {
    correctTaxPercent = currentTax;
  }

  useEffect(() => {
    const total =
      order.totalAmount +
      (correctShippingPrice ?? 0) -
      discount +
      ((order.totalAmount + (correctShippingPrice ?? 0) - discount) *
        (correctTaxPercent ?? 0)) /
        100;
    setTotal(total);

    //dispatch(addTotalAmountToOrder({ id: order.id, totalAmount: total }));
  }, [discount, order, currentTax, currentShipping]);

  useEffect(() => {
    console.log("order ChecoutLeftFooter", order);
  }, [order]);

  if (!order || !order.cart || order.cart.length === 0) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginBottom: isMiddle ? 100 : 0 }]}>
      <View style={[styles.contentContainer]}>
        <View style={[styles.block, { marginRight: isMiddle ? 12 : 0 }]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { marginLeft: 12, color: selectedTheme.text }]}
          >
            {subtotal}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { color: selectedTheme.text }]}
          >
            {currency} {order.totalAmount.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.block, { marginRight: isMiddle ? 12 : 0 }]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { marginLeft: 12, color: selectedTheme.text }]}
          >
            {yourDiscountIs}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { color: selectedTheme.text }]}
          >
            {currency} {discount.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.block, { marginRight: isMiddle ? 12 : 0 }]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { marginLeft: 12, color: selectedTheme.text }]}
          >
            {shipping}
          </Text>

          {currentShipping !== -1 ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.text, { color: selectedTheme.text }]}
            >
              {currency}
              {currentShipping.toFixed(2)}
            </Text>
          ) : (
            <TabBarIcon color={selectedTheme.iconColors} name="calculator" />
          )}
        </View>

        <View style={[styles.block, { marginRight: isMiddle ? 12 : 0 }]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { marginLeft: 12, color: selectedTheme.text }]}
          >
            {tax}
          </Text>
          {currentTax !== -1 ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.text, { color: selectedTheme.text }]}
            >
              {currentTax.toFixed(2)}%
            </Text>
          ) : (
            <TabBarIcon color={selectedTheme.iconColors} name="calculator" />
          )}
        </View>

        <View
          style={[
            styles.separador,
            {
              width: isMiddle ? 290 : 280,
              borderBottomColor: selectedTheme.text,
            },
          ]}
        ></View>
        <View
          style={[
            styles.block,
            { justifyContent: "flex-end", marginRight: isMiddle ? 12 : 0 },
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, { fontSize: 32, color: selectedTheme.text }]}
          >
            {currency}
            {total.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <View
            style={{
              display: "flex",
              width: 300,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isMiddle && (
              <View
                style={{
                  width: 12,
                  minWidth: 12,
                  height: 30,
                }}
              ></View>
            )}
            {!customer && currentPage !== "order" && (
              <PressableButton
                onPress={confirmOrder}
                title={confirmOrderTitle}
              />
            )}
            {isMiddle && (
              <View
                style={{
                  width: 6,
                  minWidth: 12,
                  height: 30,
                }}
              ></View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    marginTop: 24,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  block: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 290,
  },
  text: {
    paddingTop: 12,
    fontSize: 18,
    fontWeight: "500",
  },
  separador: {
    marginTop: 24,
    borderBottomWidth: 2,
  },
});

export default ChecoutLeftItem;
