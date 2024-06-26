import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors, { currency, discountPercent, discountPeriod } from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { dateToTimestamp } from "@/components/utils/dateToTimestamp";
import { calculateNextPeriod } from "@/components/utils/calculateNextPeriod";

const OrderRightComponent = ({ langPage, order }) => {
  const customerTitle = __("Customer");
  const fristNameTitle = __("First name");
  const langTitle = __("Supported languages");
  const couponTitle = __("Gift card or coupon code");
  const couponNumberTitle = __("Coupon number");
  const phoneTitle = __("Phone");
  const billedToTitle = __("Billed to:");
  const lastNameTitle = __("Last name");
  const addressLine1Title = __("Address line 1");
  const addressLine2Title = __("Address line 2");
  const cityTitle = __("City");
  const provinceTitle = __("Province/State");
  const zipCodeTitle = __("Zip code");
  const shippedToTitle = __("Shipped to:");
  const deliveryTitle = __("Delivery");
  const deliveryService = __("Delivery Service");
  const expactedDateTitle = __("Expacted date");
  const promoActionsTitle = __("Promo actions");
  const couponCodeTitle = __("Gift card or coupon code");
  const currentDuscountTitle = __("Your discount is");
  const useBeforeTitle =__("Use before")
  const nexDiscountTitle =__("Next discount")

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const generateRandomOrderNumber = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {}, [order]);

  if (!order || !order.cart || order.cart.length === 0) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  const daysToAdd = Number(order.deliveryTime);
  const timestamp = Number(dateToTimestamp(order.date));
  const deliveryDateTime = calculateNextPeriod(daysToAdd, timestamp);
  
  const finalTotalAmount = order.finalTotalAmount ?? 0;
  const newDicount = (finalTotalAmount / 100) * discountPercent;
  const lastDiscountDayAction = calculateNextPeriod(discountPeriod, timestamp);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selectedTheme.backgroundSecond },
      ]}
    >
      <View style={[styles.contentContainer]}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            padding: 12,
            paddingVertical: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {customerTitle}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          E-mail
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.email}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {fristNameTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.fristNameBilling}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {lastNameTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.lastNameBilling}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {langTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.lang}
        </Text>

        {/* separador */}
        <View style={{ height: 12 }} />
        <View
          style={{
            width: "100%",
            borderBottomColor: selectedTheme.borderLine,
            borderBottomWidth: 1,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            padding: 12,
            paddingVertical: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {couponTitle}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {couponNumberTitle}
        </Text>
        
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.currentCouponCode}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {currentDuscountTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {currency}{order.discount}
        </Text>

        {/* Separador */}
        <View style={{ height: 12 }} />
        <View
          style={{
            width: "100%",
            borderBottomColor: selectedTheme.borderLine,
            borderBottomWidth: 1,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            padding: 12,
            paddingVertical: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {billedToTitle}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {phoneTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.phoneBilling}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {addressLine1Title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.addressline1Billing}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {addressLine2Title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.addressline2Billing}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {cityTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.city}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {provinceTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.provinceBilling}
        </Text>

        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {zipCodeTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.zipCodeBilling}
        </Text>

        {/* separador */}
        <View style={{ height: 12 }} />
        <View
          style={{
            width: "100%",
            borderBottomColor: selectedTheme.borderLine,
            borderBottomWidth: 1,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            padding: 12,
            paddingVertical: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {shippedToTitle}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {phoneTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.phoneShipping}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {addressLine1Title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.addressline1Shipping}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {addressLine2Title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.addressline2Shipping}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {cityTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.cityShipping}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {provinceTitle}
        </Text>

        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.provinceShipping}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {zipCodeTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.zipCodeShipping}
        </Text>

        {/* separador */}
        <View style={{ height: 12 }} />
        <View
          style={{
            width: "100%",
            borderBottomColor: selectedTheme.borderLine,
            borderBottomWidth: 1,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            padding: 12,
            paddingVertical: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {deliveryTitle}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {deliveryService}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {order.deliveryCompanyName}
        </Text>

        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {expactedDateTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {deliveryDateTime}
        </Text>
        {/* separador */}
        <View style={{ height: 12 }} />
        <View
          style={{
            width: "100%",
            borderBottomColor: selectedTheme.borderLine,
            borderBottomWidth: 1,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            padding: 12,
            paddingVertical: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {promoActionsTitle}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {couponCodeTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {generateRandomOrderNumber()}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {nexDiscountTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {currency}
          {newDicount.toFixed(2)}
        </Text>

        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            padding: 12,
            paddingVertical: 4,
            color: selectedTheme.subTitle,
          }}
        >
          {useBeforeTitle}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            padding: 12,
            paddingVertical: 0,
            color: selectedTheme.subTitle,
          }}
        >
          {lastDiscountDayAction}
        </Text>


      </View>
      <View style={{ height: 30 }} />
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
    display: "flex",
    width: "100%",
    maxWidth: 300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default OrderRightComponent;
