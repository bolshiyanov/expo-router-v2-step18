import { Link, Stack } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import { Pressable, View } from "react-native";
import ArrowLeft from "@/assets/icons/arrow-left-solid.svg";
import Colors from "config";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import { useEffect } from "react";

export const unstable_settings = {  
  initialRouteName: "index",
};

export default function LayoutAuthComponent() {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentPageChangeAction("auth"));
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: selectedTheme.backgroundNav },
        headerShown: true,
        title: "AUTH",
        headerTitleStyle: {
          fontWeight: "400",
          color: selectedTheme.text
          
        },
        headerLeft: () => (
          <Link href="../" asChild>
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
