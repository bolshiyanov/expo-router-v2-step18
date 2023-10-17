import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TabBarIcon } from "../../navigatorComponents/tab-bar-icon";
import { useAppSelector } from "@/components/utils/hooks/redux";

import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";

const InStockComponent = ({ id }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const availableInStockData = useAppSelector((state) => state.availableInStock);

  const item = availableInStockData.find((item) => item.id === id);
  
  const messsge = __("Available in stock");

  if (!item) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TabBarIcon
        color={selectedTheme.iconColors}
        style={{ height: 48, width: 48 }}
        name={item.available > 0 ? "shop" : "shopNegative"}
      />

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.publishedTitle,
          {
            color: item.available > 0 ?selectedTheme.text : selectedTheme.subTitle
          },
        ]}
      >
        {messsge} {item.available}
      </Text>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 4,
    marginTop: 12,
  },
  publishedTitle: {
    fontSize: 26,
    fontWeight: "600",
    marginHorizontal: 8,
    marginVertical: 8,
    paddingBottom: 2,
  },
});

export default InStockComponent;
