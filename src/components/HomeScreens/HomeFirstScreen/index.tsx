import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";

import { fetchData } from "@/store/reducers/PostsDataSlice";
import baner from "@/assets/images/banner-3.jpg";

import { useWidth } from "@/components/utils/useWidth";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import Colors from "config";
import FirstScreenButton from "../FirstScreenButton";

const HomeFirstScreen = () => {
  const textTitle = __("0001");
  const ILookAJobTitle = __("I look a job");
  const firstScreenTitle = "Expo, like you've never seen it before";
  const firstScreenSubTitle =
    "Craft Stunning Static Websites, Stores, and Blogs for Google Search Excellence with React-Native Expo";
  const isMiddle = useWidth(768);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const dataPosts = useAppSelector((state) => state.postsData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(currentPageChangeAction("index"));
  }, []);

  if (!dataPosts || dataPosts.length === 0) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator size="large" color={selectedTheme.background} />
      </View>
    );
  }

  const itemWithMaxReads = dataPosts.reduce((maxItem, currentItem) => {
    return currentItem.totalReads > maxItem.totalReads ? currentItem : maxItem;
  }, dataPosts[0]);

  const imageOfItemWithMaxReads = itemWithMaxReads.image;

  return (
    <View style={[styles.container]}>
      <ImageBackground 
        source={require("@/assets/images/backgroundClouds.webp")}
        style={[styles.image, { zIndex: 1 }]}
      />
      <View
        style={[
          styles.imageContainer,
          {
            position: "absolute",
            right: isMiddle ? 80 : -180,
            top: 0,
            zIndex: 1,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/bolshiyanovMonoChrome.png")}
          style={styles.imageBackground}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={[styles.textContentContainer, {width: isMiddle? "54%" : 250,}]}>
          <View style={[styles.lookJob, {}]}>
            <TabBarIcon
              color="#caccce"
              style={[
                ,
                Platform.select({
                  web: {
                    transform: [{ scale: 1.1 }],
                  },
                }),
              ]}
              name="briefcase"
            />
            <Text
              style={{
                color: "#caccce",
                fontWeight: "400",
                fontSize: 18,
                paddingLeft: 12,
              }}
            >
              {ILookAJobTitle}
            </Text>
          </View>

          <Text
            style={[
              styles.title,
              { fontSize: isMiddle ? 64 : 40, lineHeight: isMiddle ? 56 : 42 },
            ]}
          >
            {firstScreenTitle}
          </Text>
          <Text
            style={[
              styles.subTitle,
              { fontSize: isMiddle ? 34 : 26, lineHeight: isMiddle ? 32 : 28 },
            ]}
          >
            {firstScreenSubTitle}
          </Text>
          
        </View>
        <FirstScreenButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: 700,
    alignSelf: "center",
    resizeMode: "cover",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
  },
  imageContainer: {
    height: 600,
    width: 387,
  },
  image: {
    width: "100%",
    height: 600,
    alignSelf: "center",
    resizeMode: "cover",
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 3,
  },
  title: {
    fontWeight: "800",
    color: "rgba(255,255,255, 0.9)",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 7,
    paddingTop: 12,
  },
  subTitle: {
    fontWeight: "600",
    color: "rgba(255,255,255, 0.9)",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 7,
    paddingTop: 24,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "absolute",
    top: 32,
    left: 24,
    zIndex: 2,
    height: 540
  },
  textContentContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    position: "absolute",
    width: "100%",
    maxWidth: 800,
    padding: 12,
    bottom: 24,

    justifyContent: "center",
    alignItems: "center",
  },
  lookJob: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#18191a",
    borderRadius: 14,
    padding: 4,
    borderColor: "#caccce",
    borderWidth: 1,
    paddingHorizontal: 12,
  },
});

export default HomeFirstScreen;
