import { makeIcon } from "./tab-bar-icon";
import { StyleSheet } from "@bacons/react-views";
import React from "react";
import { Platform, Text, useWindowDimensions, View } from "react-native";
import { __ } from "../LanguageComponents/TranslateComponent/systemTranslatre";
import { useAppSelector } from "@/components/utils/hooks/redux";

import { cns } from "../utils/cns";
import { TabBarItem } from "./TabBar";
import HeaderLogo from "./HeaderLogo";
import Colors from "config";
import cssStyles from "./root-layout.module.scss";

const SideBar = ({ visible }) => {
  const isLarge = useWidth(980);

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        jsStyles.sideBar,

        ...Platform.select({
          default: [
            !visible && {
              display: "none",
            },
            isLarge && {
              minWidth: NAV_MEDIUM_WIDTH,
            },
            { borderRightColor: "red" },
          ],

          web: [cns(cssStyles.largeVisible, cssStyles.sideBar)],
        }),
      ]}
    >
      <View
        style={[
          jsStyles.sidebarInner,
          ...Platform.select({
            default: [
              isLarge &&
                ({
                  width: NAV_MEDIUM_WIDTH,
                  minWidth: NAV_MEDIUM_WIDTH,
                  alignItems: "flex-start",
                } as const),
            ],
            web: [cns(cssStyles.sideBarInner)],
          }),
          { backgroundColor: selectedTheme.backgroundNav },
          { borderRightColor: selectedTheme.borderLine }, // Add the background color here
        ]}
      >
        <View
          style={[
            jsStyles.sidebarInner2,
            Platform.select({
              default: !isLarge && {
                alignItems: "center",
              },
              web: cns(cssStyles.sideBarHeader),
            }),
            { borderRightColor: selectedTheme.borderLine },
          ]}
        >
          <HeaderLogo />
          {/* add translate to /data/dataTranslation.ts */}
          <View style={{ gap: 4, flex: 1 }}>
            <SideBarTabItem name="home" icon={makeIcon("home")}>
              {__("SideBarTabItem_1")}
            </SideBarTabItem>
            <SideBarTabItem name="shop" icon={makeIcon("bag")}>
              {__("SideBarTabItem_2")}
            </SideBarTabItem>
            <SideBarTabItem name="blog" icon={makeIcon("explore")}>
              {__("SideBarTabItem_3")}
            </SideBarTabItem>
          </View>
          {/* Divider */}
          <View>
            <SideBarTabItem name="auth" icon={makeIcon("more")}>
              {__("SideBarTabItem_4")}
            </SideBarTabItem>
          </View>
        </View>
      </View>
    </View>
  );
};

function SideBarTabItem({
  children,
  icon,
  name,
}: {
  children: string;
  icon: (props: { focused?: boolean; color: string }) => JSX.Element;
  name: string;
}) {
  const isLarge = useWidth(980);

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <TabBarItem
      name={name}
      id={name}
      style={{
        paddingVertical: 4,
        width: "100%",
      }}
    >
      {({ focused, hovered }) => (
        <View
          style={[
            {
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 999,
            },
            hovered && {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          ]}
        >
          <View
            style={[
              {
                transitionTimingFunction: "cubic-bezier(0.17, 0.17, 0, 1)",
              },
              hovered && {
                transform: [{ scale: 1.1 }],
              },
            ]}
          >
            {icon({
              focused,
              color: selectedTheme.iconColors,
            })}
          </View>

          <Text
            style={[
              {
                color: selectedTheme.text,
                fontSize: 16,
                marginLeft: 16,
                marginRight: 16,
                lineHeight: 24,
              },
              Platform.select({
                default: {
                  display: isLarge ? "flex" : "none",
                },
                web: cns(cssStyles.sideBarTabItemText),
              }),
              focused && {
                fontWeight: "bold",
              },
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </TabBarItem>
  );
}

function useWidth(size) {
  if (typeof window === "undefined") {
    return true;
  }
  const { width } = useWindowDimensions();
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return false;
  }
  return width >= size;
}
const NAV_MEDIUM_WIDTH = 244;

const jsStyles = StyleSheet.create({
  sideBar: {
    minWidth: 72,
    width: 72,
  },
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

export default SideBar;
