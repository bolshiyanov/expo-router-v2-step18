import React from "react";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { langChangeAction } from "@/store/reducers/LangSlice";
import Colors from "config";
import { useRouter } from "expo-router";
import { supportedLang} from "config";
import { StyleSheet, Platform, View, Pressable, Text } from "react-native";



const ChangeLangButton = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const savedLang = useAppSelector((state) => state.langSlice.lang);

  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();  

  const changeLang = (newLang: string) => {
    dispatch(langChangeAction(newLang));

    if (Platform.OS === "web") {
      localStorage.setItem("lang", newLang);
    }

    router.replace("/");
  };
 
  return (
    <View style={styles.containerLang}>
      {supportedLang.map((languageObj) => {
        const languageKey = Object.keys(languageObj)[0];
        const languageValue = languageObj[languageKey];
        return (
          <Pressable key={languageKey} onPress={() => changeLang(languageKey)}>
            {({ pressed, hovered }) => (
              <Text
                style={[
                  styles.textLang,
                  {
                    color: selectedTheme.iconColors,
                    fontSize: savedLang === languageKey ? 20 : 16,
                    margin: 3,
                    fontWeight: savedLang === languageKey ? "bold" : "300",
                  },
                  Platform.select({
                    web: {
                      transform: hovered ? [{ scale: 1.2 }] : [{ scale: 1 }],
                    },
                  }),
                  pressed && {
                    transform: [{ scale: 0.9 }],
                    opacity: 0.8,
                  },
                ]}
              >
                {languageValue}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLang: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    maxHeight: 200,
    overflow: "hidden",
    flexWrap: "wrap",
    borderRadius: 5,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 12,
  },
  textLang: {
    maxWidth: 100,
    fontWeight: "200",
  },
});

export default ChangeLangButton;
