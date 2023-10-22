// The routing layer is located in the app component. In the current project version,
// adding or modifying languages in the config does not automatically create new routes.
// If you're adding or changing languages, you should go back to the app folder and create
// corresponding routes.

export const supportedLang = [
  { en: "English" },
  { es: "Español" },
  { fr: "Français" },
  { it: "Italiano" },
  { de: "Deutsch" },
  { ru: "Русский" },
];
export const defaultdLang = "en";

export const tintColorLight = "#2f95dc";
export const tintColorDark = "#2f95dc";
export const Colors = {
  tintColorLight: "#2f95dc",
  tintColorDark: "#2f95dc",
  light: {
    text: "#000",
    subTitle: "#18191a",
    background: "#fff",
    backgroundSecond: "#f3f3f3",
    backgroundNav: "#e4e6eb",
    borderLine: "#caccce",
    tint: tintColorLight,
    check: "#1FDA8A",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    iconColors: "rgba(0, 0, 0, 1)",
    transporentTop: "rgba(0, 0, 0, 0)",
    transporentButton: "rgba(255, 255, 255, 0.8)",
    transporentBackGround: "rgba(255, 255, 255, 0.5)",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    borderBottomLine: "#1b047c",
  },
  dark: {
    text: "#fff",
    subTitle: "#caccce",
    background: "#282828",
    backgroundSecond: "#202020",
    backgroundNav: "#18191a",
    borderLine: "#3a3b3c",
    tint: tintColorDark,
    check: "#1FDA8A",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    transporentTop: "rgba(0, 0, 0, 0)",
    transporentBottom: "rgba(0, 0, 0, 0.8)",
    iconColors: "rgba(230, 230, 230, 1)",
    transporentBackGround: "rgba(0, 0, 0, 0.5)",
    transporentButton: "rgba(0, 0, 0, 0.8)",
    textShadowColor: "rgba(255, 255, 255, 0.7)",
    borderBottomLine: "#e91e63",
  },
};
export default Colors;

export const currency = "$";
export const nameOfcompany = "MY COMPANY";

export const discountData = [
  { code: "1234", discount: 50 },
  { code: "12345", discount: 25 },
  { code: "123456789", discount: 10 },
  { code: "123456", discount: 35 },
  { code: "1234567", discount: 60 },
  { code: "qwerty", discount: 15 },
  { code: "12345678", discount: 5 },
  { code: "password", discount: 50 },
];

//In this function, you can add logic to create a new coupon
//for a discount in percent for the next payment, and you can
//also add a period in days during which this coupon can be used.

export const discountPercent = 5;
export const discountPeriod = 365;


