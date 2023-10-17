import React from "react";

const icons = require.context("../../assets/icons");

export type IconName =
  | "logo"
  | "logo-small"
  | "more"
  | "explore-active"
  | "explore"
  | "facebook"
  | "twitter"
  | "youtube"
  | "instagram"
  | "home"
  | "search"
  | "search-active"
  | "messages-active"
  | "messages"
  | "notifications"
  | "sun"
  | "moon"
  | "lang-active"
  | "lang"
  | "bag"
  | "bag-active"
  | "arrow-down-wide-short-solid"
  | "arrow-up-short-wide-solid"
  | "filter"
  | "star"
  | "bookmark"
  | "like"
  | "pen"
  | "eye"
  | "book"
  | "bars"
  | "cart"
  | "truck"
  | "shop"
  | "shopNegative"
  | "trash"
  | "trash-small"
  | "trash-middle"
  | "calculator"
  | "wallet"
  | "check";

export function Icon({
  name,
  ...props
}: {
  name: IconName;
  fill: string;
  style?: any;
  width?: number;
  height?: number;
}) {
  const Comp = React.useMemo(() => {
    const imp = icons(`./${name}.svg`);
    if (!imp) {
      throw new Error(
        `Icon not found: ${name}. Options: ${icons.keys().join(", ")}}`
      );
    }
    return imp.default;
  }, [name]);
  return <Comp {...props} color={props.fill} />;
}
