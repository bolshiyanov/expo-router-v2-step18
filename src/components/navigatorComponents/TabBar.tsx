import { IconName } from "../common/icon";
import { TabBarIcon } from "./tab-bar-icon";
import { TabbedNavigator } from "./tab-slot";
import { Pressable, StyleSheet } from "@bacons/react-views";
import { Link } from "expo-router";
import React from "react";
import { Platform, View, ViewStyle } from "react-native";

import { useAppSelector } from "@/components/utils/hooks/redux";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cns } from "../utils/cns";
import { defaultdLang } from "config";

import Colors from "config";
import cssStyles from "./root-layout.module.scss";

const TabBar = ({ visible }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        {
          paddingBottom: useSafeAreaInsets().bottom,
        },
        Platform.select({
          default: {
            display: visible ? "flex" : "none",
          },
          web: cns(cssStyles.smallVisible),
        }),
        { backgroundColor: selectedTheme.backgroundNav },
      ]}
    >
      <View
        style={[jsStyles.nav, { borderTopColor: selectedTheme.borderLine }]}
      >
        {[
          { name: "index", id: "home", icon: "home" },
          { name: "shop", id: "shop", icon: "bag" },
          { name: "blog", id: "blog", icon: "explore" },
          
          { name: "auth", id: "auth", icon: "more" },
        ].map((tab, i) => (
          <TabBarItem key={i} name={tab.name} id={tab.id}>
            {({ focused, pressed, hovered }) => (
              <TabBarIcon
                color={selectedTheme.iconColors}
                style={[
                  {
                    paddingHorizontal: 8,
                  },
                  Platform.select({
                    web: {
                      transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                    },
                  }),
                  pressed && {
                    transform: [{ scale: 0.9 }],
                    opacity: 0.8,
                  },
                ]}
                name={tab.icon as IconName}
                focused={focused}
              />
            )}
          </TabBarItem>
        ))}
      </View>
    </View>
  );
};

export function TabBarItem({
  children,
  name,
  style,
  id,
}: {
  children?: any;
  name: string;
  style?: ViewStyle;
  id: string;
}) {
  const focused = useIsTabSelected(id);
  
  const lang = useAppSelector((state) => state.langSlice.lang);

  if (name.startsWith("/") || name.startsWith(".")) {
    return (
      <Link href={`./${name}`} asChild style={style}>
        <Pressable>{(props) => children({ ...props, focused })}</Pressable>
      </Link>
    );
  }

  return (
    <TabbedNavigator.Link name={`${lang? lang : defaultdLang}/${id}`} asChild style={style}>
      <Pressable>{(props) => children({ ...props, focused })}</Pressable>
    </TabbedNavigator.Link>
  );
}

function useIsTabSelected(name: string): boolean {
  const { navigation } = TabbedNavigator.useContext();

  const state = navigation.getState();
  const current = state.routes.find((route, i) => state.index === i);

  return current?.name === name;
}

const jsStyles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    borderTopWidth: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: 49,
    paddingHorizontal: 16,
  },
});

export default TabBar;
