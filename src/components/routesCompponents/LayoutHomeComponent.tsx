import {Stack } from "expo-router";
import { __ } from "../LanguageComponents/TranslateComponent/systemTranslatre";

export const unstable_settings = {
  initialRouteName: "index",
};


const LayoutHomeComponent =() =>{
const title = __("START")

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: title ,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default LayoutHomeComponent