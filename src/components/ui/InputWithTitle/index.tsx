import { useAppSelector } from "@/components/utils/hooks/redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Platform, Text } from "react-native";
import Colors from "config";
import validator from "@/components/utils/validator";

const InputWithTitle = ({
  title,
  inputName,
  active,
  onInputChange,
  backGroundColor,
  placeholder,
  autoComplete,
  keyboardType,
}) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const delivery = useAppSelector((state) => state.progressBarSlice.delivery);
  const [errorInputValue, setErrorInputValue] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!errorInputValue) {
      onInputChange(text); // Pass text as the argument
    } else {
      onInputChange("");
    }
  }, [errorInputValue, text]);

  const handleTextChange = (inputText) => {
    if (active && !delivery) {
      setText(inputText);
      validator({ inputText, autoComplete, setErrorInputValue });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: title !== "" ? 94 : 70,
          borderColor:
            active && !delivery
              ? selectedTheme.subTitle
              : selectedTheme.borderLine,
          backgroundColor: selectedTheme[backGroundColor],
        },
      ]}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: 16,
          color:
            active && !delivery
              ? selectedTheme.subTitle
              : selectedTheme.borderLine,
        }}
      >
        {title}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: !text  || delivery
              ? selectedTheme.borderLine
              : !errorInputValue 
              ? selectedTheme.tint
              : "red",
          },
        ]}
      >
        <TextInput
          placeholder={active && !delivery ? placeholder : ""}
          key={title}
          placeholderTextColor="red"
          value={text}
          onChangeText={handleTextChange}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            padding: 10,
            color: selectedTheme.text,
            ...Platform.select({
              web: {
                outline: "none",
              },
            }),
          }}
        />
      </View>
      <View
        style={[
          styles.inputNameContainer,
          {
            backgroundColor: selectedTheme[backGroundColor],
          },
        ]}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            padding: 2,
            fontSize: 10,
            color:
              active && !delivery
                ? selectedTheme.subTitle
                : selectedTheme.borderLine,
          }}
        >
          {inputName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    maxWidth: "100%",
    width: "100%",
    position: "relative",
  },

  inputContainer: {
    height: 50,
    maxWidth: "100%",
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  inputNameContainer: {
    position: "absolute",
    bottom: 42,
    left: 16,
    maxWidth: 116,
  },
});

export default InputWithTitle;
