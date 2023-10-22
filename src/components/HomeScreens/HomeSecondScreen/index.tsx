import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useWidth } from "@/components/utils/useWidth";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";

const HomeSecondScreen = () => {
  const experiencesTitle = __("0002");
  const experiencesSubTitle = __("0003");
  const experiencesText = __("0004");
  const experiencesText2 = __("0005");
  const experiencesText3 = __("0006");
  const experiencesText4 = __("0007");
  const experiencesText5 = __("0008");
  const isMiddle = useWidth(768);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  return (
    <View
      style={[styles.container, { backgroundColor: selectedTheme.background }]}
    >
      <View style={{ maxWidth: 800 , paddingBottom: 24, borderBottomColor: selectedTheme.borderBottomLine, borderBottomWidth: 2, marginBottom: 12}}>
        <Text
          style={{
            color: selectedTheme.text,
            fontWeight: "800",
            fontSize: isMiddle ? 40 : 28,
            marginTop: 24,
            textAlign: "center",
          }}
        >
          {experiencesTitle}
        </Text>
        <Text
          style={{
            color: selectedTheme.subTitle,
            fontWeight: "400",
            fontSize: isMiddle ? 26 : 18,

            textAlign: "center",
          }}
        >
          {experiencesSubTitle}
        </Text>

        <Text
          style={{
            color: selectedTheme.subTitle,
            fontWeight: "400",
            fontSize: isMiddle ? 18 : 14,
            marginTop: 18,
            textAlign: "left",
          }}
        >
          {experiencesText}
          <br />
          <br />
          {experiencesText2}
          <br />
          <br />
          {experiencesText3}
          <br />
          <br />
          {experiencesText4}
          <br />
          <br />
          {experiencesText5}
          <br />
          <br />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    width: "100%",
  },
});

export default HomeSecondScreen;
