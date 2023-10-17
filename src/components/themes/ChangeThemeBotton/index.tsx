import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { themeChangeAction } from "@/store/reducers/ThemeSlice";
import Colors from "config";

import {
  StyleSheet,
  Platform,
  View,
  Pressable,
} from "react-native";

import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";

const ChangeThemeButton = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.themeSlice.theme);
  const selectedTheme = theme === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    if (Platform.OS === "web") {
      const savedTheme = localStorage.getItem("colorTheme");
      if (savedTheme) {
        dispatch(themeChangeAction(savedTheme)); // Dispatch the saved theme from local storage
      }
    }
  }, [dispatch]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(themeChangeAction(newTheme));

    if (Platform.OS === "web") {
      localStorage.setItem("colorTheme", newTheme);
    }
  };

  return (
    <View
      style={[
        { position: "absolute", display: 'flex', alignItems:'center', justifyContent: 'center', top: 9, right: 16, height: 40, width: 40, borderRadius: 5, backgroundColor: selectedTheme.transporentButton  },
        Platform.select({
          ios: {  top: 45, right: 18, height: 35, width: 35, padding: 2 },
        }),

      ]}
    >
      <Pressable onPress={toggleTheme} >
        {({ pressed, hovered }) => (
          <TabBarIcon
            color={selectedTheme.iconColors }
            style={[
              {
               
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
            name={theme === "dark" ? "sun" : "moon"}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
});

export default ChangeThemeButton;
