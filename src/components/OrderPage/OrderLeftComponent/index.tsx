import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import ChecoutLeftItem from "@/components/CheckOutPage/ChecoutLeftContainer/ChecoutLeftItem";
import ChecoutLeftFooter from "@/components/CheckOutPage/ChecoutLeftContainer/ChecoutLeftFooter";

const OrderLeftComponent = ({ langPage, order }) => {
  const summaryTitle = __("Summary");
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

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
            padding: 24,
            color: selectedTheme.subTitle,
          }}
        >
          {summaryTitle}
        </Text>
      </View>
      <View>
        <ChecoutLeftItem langPage={langPage} order={order} />
        <ChecoutLeftFooter langPage={langPage} order={order} />
      </View>
      <View style={{ height: 30 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default OrderLeftComponent;
