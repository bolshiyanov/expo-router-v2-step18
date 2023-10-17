import { useAppSelector } from "@/components/utils/hooks/redux";
import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import Colors from "config";

const SwitchButton = ({ initialValue, onToggle, title }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(newState);
  };

  
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 12,
      }}
    >
      <Switch
        trackColor={{
          false: selectedTheme.borderLine,
          true: selectedTheme.borderLine,
        }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Text style={{ marginLeft: 12, color: selectedTheme.text}}>
        {title}
      </Text>
    </View>
  );
};

export default SwitchButton;
