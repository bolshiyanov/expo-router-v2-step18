import { useEffect } from "react";
import { useAppDispatch } from "@/components/utils/hooks/redux";
import { getLocales } from "expo-localization";
import { langChangeAction } from "@/store/reducers/LangSlice";
import { supportedLang, defaultdLang } from "config";
import { Platform } from "react-native";

const LanguageLogicComponent = () => {
  const dispatch = useAppDispatch();

  function extractKeys(arr) {
    return arr.map((obj) => Object.keys(obj)[0]);
  }

  const langArray = extractKeys(supportedLang);
  
  useEffect(() => {
    if (Platform.OS === "web") {
      const savedLang = localStorage.getItem("lang");
      const browserLang = navigator.language.split("-")[0]; // Extract the language code

      if (!savedLang) {
        if (langArray.includes(browserLang)) {
          dispatch(langChangeAction(browserLang));
          localStorage.setItem("lang", browserLang);
        } else {
          // If user's language is not supported, dispatch 'en' or your default language
          const defaultLanguage = defaultdLang; // Change this to your desired default language
          dispatch(langChangeAction(defaultLanguage));
          localStorage.setItem("lang", defaultLanguage);
        }
      } else {
        dispatch(langChangeAction(savedLang));
      }
    } else {
      const deviceLang = getLocales()[0].languageCode;

      if (langArray.includes(deviceLang)) {
        dispatch(langChangeAction(deviceLang));
      } else {
        const defaultLanguage = defaultdLang;
        dispatch(langChangeAction(defaultLanguage));
      }
    }
  }, [dispatch, supportedLang]);
  return null;
};

export default LanguageLogicComponent;
