import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TabBarIcon } from "../../navigatorComponents/tab-bar-icon";
import { useAppSelector } from "@/components/utils/hooks/redux";

import { transformDate } from "@/components/utils/transformDate";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";

const AddToShopComponent = ({ id }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const data = useAppSelector((state) => state.shopData);

  const AddedToShop = data.find((item) => item.id === id);
  
  if (!AddedToShop) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <TabBarIcon color={selectedTheme.iconColors} name="pen" />

      <Text
        style={[
          styles.publishedTitle,
          {
            color: selectedTheme.text,
          },
        ]}
      >
        {transformDate(AddedToShop.dateCreate)}
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
    marginTop: 12,
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

export default AddToShopComponent;
