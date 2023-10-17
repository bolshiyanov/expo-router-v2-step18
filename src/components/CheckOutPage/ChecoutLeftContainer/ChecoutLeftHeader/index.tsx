import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency } from "config";

import { useWidth } from "@/components/utils/useWidth";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import TitleSubtitleComponent from "../../../ui/TitleSubtitleComponent";
import { totalQuantityInOrder } from "@/components/utils/totalQuantityInOrder";
import { nameOfcompany } from "config";
import { useRouter } from "expo-router";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { RemoveAllInProgressBarAction } from "@/store/reducers/ProgressBarSlice";

const CheckoutLeftHeader = () => {
  const store = __("STORE");
  const orderSummary = __("Order summary");
  const message = __("Return to shopping")

  const subTitle = __("Quantity items in your cart is");
  const subTitelQuntity = `${subTitle} ${totalQuantityInOrder()}`;

  const fontSize18 = 18;
  const fontSize20 = 20;
  const title = `${nameOfcompany} ${store}`;
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isItemsInCart = useAppSelector((state) => state.cartSlice);


  const isMiddle = useWidth(768);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const returnToShopping = () => {
    dispatch(currentPageChangeAction(""));
    dispatch(RemoveAllInProgressBarAction());
    router.replace("/");
  };

  return (
    <View
      style={[
        styles.headerContainer,
        { justifyContent: isMiddle ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={{ width: "100%", maxWidth: 520 }}>
        <View style={styles.contentContainer}>
          <TitleSubtitleComponent
            title={title}
            subTitle=""
            active={true}
            border={false}
            fontSize={fontSize20}
          />
        </View>
        <View style={styles.contentContainer}>
          <TitleSubtitleComponent
            title={orderSummary}
            border={false}
            active={true}
            subTitle={subTitelQuntity}
            fontSize={fontSize18}
          />
          
        </View>
        
        {isItemsInCart.length  > 0 && <Pressable onPress={returnToShopping} style={styles.returnToSippingContainer}>
        <Text style={{color: selectedTheme.tint,
        paddingBottom: 12, }}>{""}&lt;{message}</Text>
        </Pressable>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18
  },

  contentContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    margin: 12,
    justifyContent: "flex-start",
  },
  returnToSippingContainer: {
    margin: 24,
    marginTop: -18,
    
   
  }
});

export default CheckoutLeftHeader;
