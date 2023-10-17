import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { TabBarIcon } from "../../navigatorComponents/tab-bar-icon";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { readAdd } from "@/store/reducers/ReadSlice";
import { fetchReadeData } from "@/store/reducers/ReadSlice";
import { transformDate } from "@/components/utils/transformDate";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";

const ReadComponent = ({ id, onClick }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const data = useAppSelector((state) => state.readSlice);

  const existingRead = data.find((item) => item.id === id);

  if (!data) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />;
      </View>
    );
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReadeData());
  }, [dispatch]);

  const currentDate = Math.floor(new Date().getTime() / 1000);

  useEffect(() => {
    if (onClick) {
      dispatch(readAdd({ id, date: currentDate }));
    }
  }, [onClick]);

  const notExistingMessage = __("You have never read this post");

  if (existingRead) {
    return (
      <View style={styles.container}>
        <TabBarIcon color={selectedTheme.iconColors} name="book" />

        <Text
          style={[
            styles.publishedTitle,
            {
              color: selectedTheme.text,
            },
          ]}
        >
          {transformDate(existingRead.date)}
        </Text>
      </View>
    );
  } else {
    return (
      <Text
        style={[
          styles.publishedTitle,
          {
            color: selectedTheme.text,
          },
        ]}
      >
        {notExistingMessage}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 4
  },
  publishedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
    marginVertical: 8,
    paddingBottom: 2
  },
});

export default ReadComponent;
