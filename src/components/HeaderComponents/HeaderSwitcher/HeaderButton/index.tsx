import React from "react";
import { Platform, Pressable, View, StyleSheet } from "react-native";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors from "config";
import { fetchRestartData } from "@/store/reducers/CategorySlice";

const HeaderButton = ({ active, onPress, iconName }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

const dispatch = useAppDispatch()

  const handlePress = () => {
    if (onPress) {
      onPress();
      dispatch(fetchRestartData());
    }
  };

  return (
    <View
      style={[
        styles.iconContainer,
        
      ]}
    >
      <Pressable onPress={handlePress}>
        {({ pressed, hovered }) => (
          <TabBarIcon
            color={active
              ? selectedTheme.borderBottomLine : selectedTheme.iconColors}
            style={{
              marginHorizontal: 6, paddingBottom: 4,
              ...(Platform.OS === "web" && {
                transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
              }),
              ...(pressed && {
                transform: [{ scale: 0.9 }],
                opacity: 0.8,
              }),
            }}
            name={iconName}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
  },
});

export default HeaderButton;
