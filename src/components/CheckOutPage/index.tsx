import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors from "config";

import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import CheckoutLeftContainer from "./ChecoutLeftContainer";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { fetchOrder } from "@/store/reducers/OrdersSlice";
import CheckoutRightContainer from "./CheckoutRightContainer";
import CheckoutRightHeader from "./CheckoutRightContainer/CheckoutRightHeader";
import CheckoutRightProgressBar from "./CheckoutRightContainer/CheckoutRightProgressBar";
import ChecoutLeftItem from "./ChecoutLeftContainer/ChecoutLeftItem";
import ChecoutLeftFooter from "./ChecoutLeftContainer/ChecoutLeftFooter";
import CheckoutRightBilling from "./CheckoutRightContainer/CheckoutRightBilling";
import ChecoutLeftHeader from "./ChecoutLeftContainer/ChecoutLeftHeader";
import CheckoutRightDelivery from "./CheckoutRightContainer/CheckoutRightDelivery";
import CheckoutRightPayment from "./CheckoutRightContainer/CheckoutRightPayment";

const CheckOutPage = ({ langPage }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const orders = useAppSelector((state) => state.ordersSlice.orders);
  const currentId = "0";
  const order = orders.find((item) => item.id === currentId);

  useEffect(() => {
    dispatch(currentPageChangeAction("checkout"));
    if (Platform.OS === "web") {
      dispatch(fetchOrder());
    }
  }, []);

  const isMiddle = useWidth(768);

  if (!order || order === undefined) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      {isMiddle && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 60,
            backgroundColor: selectedTheme.backgroundNav,
            borderBottomWidth: 1,
            borderBottomColor: selectedTheme.borderLine,
          }}
        />
      )}
      <View
        style={[
          styles.container,
          {
            marginTop: isMiddle ? 60 : 0,
            backgroundColor: selectedTheme.backgroundSecond,
          },
        ]}
      >
        {isMiddle ? (
          <>
            <CheckoutLeftContainer langPage={langPage} order={order} />
            <CheckoutRightContainer langPage={langPage} order={order} />
          </>
        ) : (
          <View
            style={[
              styles.nestedContainer,
              {
                paddingLeft: 0,
                paddingRight: 12,
                width: "100%",
                height: "100%",
              },
            ]}
          >
            <CheckoutRightHeader langPage={langPage} order={order} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              
              <CheckoutRightProgressBar />
              <ChecoutLeftHeader />
              <ChecoutLeftItem langPage={langPage} order={order} />
              <ChecoutLeftFooter langPage={langPage} order={order} />
              <CheckoutRightProgressBar />
              <View style={{ height: 24 }} />
              <CheckoutRightBilling order={order} />
              <CheckoutRightDelivery order={order} />
              <CheckoutRightPayment  order={order}/>
              <View style={{ height: 336 }} />
            </ScrollView>
          </View>
        )}
      </View>
    </>
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
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    height: "100%",
  },
  nestedContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default CheckOutPage;
