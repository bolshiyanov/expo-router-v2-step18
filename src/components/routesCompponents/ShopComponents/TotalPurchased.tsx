import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TabBarIcon } from "../../navigatorComponents/tab-bar-icon";
import { useAppSelector } from "@/components/utils/hooks/redux";

import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";

const TotalPurchased = ({ id }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const data = useAppSelector((state) => state.shopData);

  const item = data.find((item) => item.id === id);

  const messsge = __("Already bought")
  
  if (!item.totalPurchased) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <TabBarIcon color={selectedTheme.iconColors} name="truck" />

      <Text
        style={[
          styles.publishedTitle,
          {
            color: selectedTheme.text,
          },
        ]}
      >
        {item.totalPurchased}-{messsge}
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
    marginLeft: 4
  },
  publishedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
    marginVertical: 8,
    paddingBottom: 2,
  },
});

export default TotalPurchased;
