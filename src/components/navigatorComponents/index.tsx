import { TabbedNavigator } from "./tab-slot";
import { StyleSheet } from "@bacons/react-views";
import React from "react";
import { Platform, View } from "react-native";
import { useWidth } from "../utils/useWidth";
import { useAppSelector } from "@/components/utils/hooks/redux";

import { cns } from "../utils/cns";
import SideBar from "./SideBar";
import AppHeader from "./AppHeader";
import TabBar from "./TabBar";
import Colors from "config";
import cssStyles from "./root-layout.module.scss";

export function ResponsiveNavigator() {
  const isRowLayout = useWidth(768);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <TabbedNavigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: selectedTheme.iconColors,
      }}
    >
      <View
        style={[
          jsStyles.flex1,
          Platform.select({
            default: {
              flexDirection: isRowLayout ? "row" : "column",
            },
            web: cns(cssStyles.container),
          }),
        ]}
      >
        <SideBar visible={isRowLayout} />
        <AppHeader visible={!isRowLayout} />
        <TabbedNavigator.Slot />
        <TabBar visible={!isRowLayout} />
      </View>
    </TabbedNavigator>
  );
}

const jsStyles = StyleSheet.create({
  sidebarInner: {
    position: Platform.select({ web: "fixed", default: "absolute" }),
    height: "100%",
    maxHeight: "100%",
    alignItems: "stretch",
    borderRightWidth: 1,
    minWidth: 72,
    width: 72,
    paddingTop: 8,
    paddingHorizontal: 12,
    paddingBottom: 20,
    
  },
  flex1: { flex: 1 },

  sidebarInner2: {
    flex: 1,
    alignItems: "stretch",
    height: "100%",
    justifyContent: "space-between",
    
  },
});
