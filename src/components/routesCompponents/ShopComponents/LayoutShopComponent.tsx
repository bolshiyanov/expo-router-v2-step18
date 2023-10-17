import { Link, Stack } from "expo-router";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { Pressable, View } from "react-native";
import ArrowLeft from "@/assets/icons/arrow-left-solid.svg";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

export const unstable_settings = {  
  initialRouteName: "index",
};

export default function LayoutShopComponent() {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
 

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: selectedTheme.backgroundNav },
        headerShown: true,
        title: __("code-items"),
        headerTitleStyle: {
          fontWeight: "400",
          color: selectedTheme.text
          
        },
        headerLeft: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <ArrowLeft width={28} height={28} fill= {selectedTheme.iconColors}/>
                </View>
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index" 
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "300",
          },
        }}
      />
      
    </Stack>
  );
}
