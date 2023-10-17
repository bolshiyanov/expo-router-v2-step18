import { Icon } from "../common/icon";
import React from "react";
import {
  Platform,
  View,
  StyleSheet
} from "react-native";

import { useAppSelector } from "@/components/utils/hooks/redux";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cns } from "../utils/cns";

import Colors from "config";
import cssStyles from "./root-layout.module.scss";

const AppHeader = ({ visible }) => {
  const { top } = useSafeAreaInsets();
  const height = 60 + top;

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <>
      <View style={{ height }} />
      <View
        style={[
          Platform.select({
            default: !visible && {
              display: "none",
            },
            web: cns(cssStyles.smallVisible),
          }),
          { height, paddingTop: top },
          jsStyles.appHeader,
          { backgroundColor: selectedTheme.backgroundNav },
          { borderBottomColor: selectedTheme.borderLine },
        ]}
      >
        <Icon name="logo" fill={selectedTheme.iconColors} />
      </View>
    </>
  );
};

const jsStyles = StyleSheet.create({

    appHeader: {
      zIndex: 10,
      backgroundColor: "white",
      position: Platform.select({ web: "fixed", default: "absolute" }),
      top: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyConteborderBottomColornt: "space-between",
      borderBottomWidth: 1,
    }
  });

export default AppHeader;
