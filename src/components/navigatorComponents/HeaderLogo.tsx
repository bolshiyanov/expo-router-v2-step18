import { Icon } from "../common/icon";
import { Pressable, StyleSheet } from "@bacons/react-views";
import { Link } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";

import { useAppSelector } from "@/components/utils/hooks/redux";

import { useWidth } from "../utils/useWidth";
import { cns } from "../utils/cns";

import Colors from "config";
import cssStyles from "./root-layout.module.scss";

const HeaderLogo = () => {
  const isLargeHorizontal = useWidth(980);
  const isSmallHorizontal = useWidth(768);

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <Link
      style={[
        { paddingVertical: 20, alignItems: "flex-start" },
        Platform.select({
          default: isSmallHorizontal &&
            !isLargeHorizontal && {
              paddingTop: 0,
              minHeight: 96,
              marginTop: 12,
              paddingBottom: 23,
              height: 96,
            },
          web: cns(cssStyles.headerLink),
        }),
      ]}
      href="/"
      asChild
    >
      <Pressable>
        {({ hovered }) => (
          <Text
            style={[
              jsStyles.headerLogo,
              {
                backgroundColor: hovered ? "rgba(0, 0, 0, 0.1)" : "transparent",
              },
            ]}
          >
            <Icon
              style={Platform.select({
                default: !isLargeHorizontal && { display: "none" },
                web: cns(cssStyles.wideVisible),
              })}
              name="logo"
              fill={selectedTheme.iconColors}
            />
            <Icon
              style={Platform.select({
                default: isLargeHorizontal && { display: "none" },
                web: cns(cssStyles.wideHidden),
              })}
              name="logo-small"
              fill={selectedTheme.iconColors}
            />
          </Text>
        )}
      </Pressable>
    </Link>
  );
};

const jsStyles = StyleSheet.create({
  headerLogo: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    borderRadius: 4,
  },
});

export default HeaderLogo;
