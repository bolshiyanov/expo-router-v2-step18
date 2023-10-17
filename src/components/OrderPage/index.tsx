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
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { fetchOrder } from "@/store/reducers/OrdersSlice";
import OrderLeftComponent from "./OrderLeftComponent";
import OrderRightComponent from "./OrderRightComponent";
import OrderHeader from "./OrderHeader";

const OrderPage = ({ langPage }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const [order, setOrder] = useState({});


  const orders = useAppSelector((state) => state.ordersSlice.orders);

  useEffect(() => {
    dispatch(currentPageChangeAction("order"));
    if (Platform.OS === "web") {
      dispatch(fetchOrder());
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const lastOrder = orders[orders.length - 1];
      setOrder(lastOrder);
    } else {
      console.log("No orders available.");
    }
  }, [orders]);

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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <OrderHeader langPage={langPage} order={order} />
            <View style={styles.forIsMiddleContainer}>
              <OrderLeftComponent langPage={langPage} order={order} />
              <OrderRightComponent langPage={langPage} order={order} />
            </View>
          </ScrollView>
        ) : (
          <View
            style={[
              styles.nestedContainer,
              {
                width: "100%",
                height: "100%",
              },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              <OrderHeader langPage={langPage} order={order} />
              <OrderRightComponent langPage={langPage} order={order} /> 
              <OrderLeftComponent langPage={langPage} order={order} />

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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  forIsMiddleContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  nestedContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default OrderPage;
