import { setupStore } from "@/store/store";
import { Provider } from "react-redux";

import Head from "expo-router/head";
import { ResponsiveNavigator } from "@/components/navigatorComponents";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import ChangeThemeButton from "@/components/themes/ChangeThemeBotton";
import LanguageLogicComponent from "@/components/LanguageComponents/LanguageLogicComponent";
import CartButtonComponent from "@/components/CartComponents/CartButtonComponent"; 
import OrderButtonComponent from "@/components/CheckOutPage/OrderButtonComponent";


const store = setupStore();

export const unstable_settings = {
  initialRouteName: "index",
};

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <Head>
        <title>React static site and web</title>
        <meta
          name="description"
          content="Builder Apps for Crafting Static Websites for Google and Other Social Networks, as well as a Mobile App for iOS and Android"
        />
      </Head>
      <ResponsiveNavigator />
      <ChangeThemeButton />
      <CartButtonComponent />
      <OrderButtonComponent />
      <LanguageLogicComponent />      
    </Provider>
  );
}
