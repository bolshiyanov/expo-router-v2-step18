import { StyleSheet, View, Text } from "react-native";
import React from "react";
import TitleSubtitleComponent from "@/components/ui/TitleSubtitleComponent";
import Colors, { nameOfcompany } from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import PressableButton from "@/components/common/PressableButton";
import { useRouter } from "expo-router";

const OrderHeader = ({ langPage, order }) => {
  const router = useRouter();
  const store = __("STORE");
  const thankYouTitle = __("Thank you for your order!");
  const orderConfirmTitle = __("Order confirmation number:");
  const continueToShopingTitle = __("Continue to shoping");
  const orderDateTitle = __("Order date:");
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const fontSize20 = 20;
  const title = `${nameOfcompany} ${store}`;

  const continueToShoping = () => {
    router.replace("/");
  };
  return (
    <View
      style={[styles.container, { backgroundColor: selectedTheme.background }]}
    >
      <View style={styles.nameOfCompanyContainer}>
        <TitleSubtitleComponent
          title={title}
          subTitle=""
          active={true}
          border={false}
          fontSize={fontSize20}
        />
      </View>
      <View style={[styles.container]}>
        <View
          style={[
            styles.checkContainer,
            { backgroundColor: selectedTheme.check },
          ]}
        >
          <TabBarIcon color="white" style={{ fontSize: 100 }} name="check" />
        </View>
        <View style={{ height: 24 }} />
        <Text style={{ fontSize: 20, color: selectedTheme.text }}>
          {thankYouTitle}
        </Text>
        <View style={{ height: 12 }} />
        <Text style={{ fontSize: 16, color: selectedTheme.subTitle }}>
          {orderConfirmTitle} #{order.id}
        </Text>
        <View style={{ height: 12 }} />
        <Text style={{ fontSize: 16, color: selectedTheme.subTitle }}>
          {orderDateTitle} {order.date}
        </Text>
        <View style={{ marginTop: 12, width: 300 }}>
          <PressableButton
            onPress={continueToShoping}
            title={continueToShopingTitle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 560,
    alignItems: "center",
    padding: 24,
  },
  nameOfCompanyContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  checkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: 250,
    borderRadius: 125,
  },
});

export default OrderHeader;
