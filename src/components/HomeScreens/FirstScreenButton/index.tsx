import React from "react";
import { StyleSheet, Text, Pressable, Platform, View } from "react-native";
import { cns } from "@/components/utils/cns";
import cssStyles from "@/components/navigatorComponents/root-layout.module.scss"; // Make sure this path is correct.
import { useWidth } from "@/components/utils/useWidth";
import * as Linking from 'expo-linking';

const FirstScreenButton = () => {
  const isMiddle = useWidth(768); // You may need to adjust the width value based on your use case.

  const clickEvent = () => {
    
  };

  return (
    
      <Pressable
        style={[{ width: 220, height: 50 },
          Platform.select({
            web: cns(cssStyles.glowOnHover),
          }),
        ]}
        onPress={() => Linking.openURL('https://t.me/bolshiyanov')}
      >
        {({ pressed, hovered }) => (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              Platform.select({
                web: {
                  transform: [
                    { scale: hovered ? 1.03 : 1 },
                    { scale: pressed ? 0.95 : 1 },
                  ],
                  transition: "transform 0.5s",
                  boxShadow: pressed
                    ? "0px 0px 10px rgba(0, 0, 0, 0)" // Shadow on press
                    : "none", // No shadow when not pressed
                },
                android: {
                  elevation: pressed ? 6 : 0, // Elevation on press
                },
              }),
              styles.button,
              {
                fontSize: isMiddle ? 16 : 10,
              },
            ]}
          >
            Contact
          </Text>
        )}
      </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    fontWeight: "500",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    zIndex: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    color: '#f3f3f3'
  },
});

export default FirstScreenButton;
