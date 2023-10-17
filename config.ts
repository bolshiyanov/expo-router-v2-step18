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
    check: '#1FDA8A',
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
    check: '#1FDA8A',
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


export const shippingArray = [
  { id: "0", region: "Shipping",shippingPrice: 0, tax: 0, deliveryTime:0},
  { id: "1", region: "Spain",shippingPrice: 50, tax: 11, deliveryTime: 5},
  { id: "2", region: "France", shippingPrice: 60, tax: 22, deliveryTime:6},
  { id: "3", region: "Germany", shippingPrice: 60,tax:7 , deliveryTime:7},
  { id: "4", region: "Italy", shippingPrice: 60,tax: 4, deliveryTime:4},
  { id: "5", region: "United Kingdom", shippingPrice: 60,tax: 24, deliveryTime:8 },
  { id: "6", region: "Russia", shippingPrice: 100, tax: 18, deliveryTime:15},
  { id: "7", region: "Turkey", shippingPrice: 76,tax: 22, deliveryTime:8 },
  { id: "8", region: "Poland", shippingPrice: 10,tax: 25, deliveryTime:12},
  { id: "9", region: "Island", shippingPrice: 110,tax: 14, deliveryTime:12 },
  { id: "10", region: "Andora", shippingPrice: 100, tax: 18, deliveryTime:5},  
];

export const AshippingArray = [
  {
    id: "1",
    image: "",
    region: "Spain",
    deliveryOptions: [
      { deliveryCompanyName: 'UPS', shippingPrice: 50, deliveryTime: 2 },
      { deliveryCompanyName: 'FedEX', shippingPrice: 60, deliveryTime: 3 },
      { deliveryCompanyName: 'DHL', shippingPrice: 30, deliveryTime: 7 },
      { deliveryCompanyName: 'Amazon Logistic', shippingPrice: 45, deliveryTime: 6 },
      { deliveryCompanyName: 'United States Postal Service', shippingPrice: 15, deliveryTime: 16 }
    ]
  }
];






