import {Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};


export default function LayoutHomeComponent() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "HOME",
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
