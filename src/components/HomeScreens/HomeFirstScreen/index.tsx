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
import Colors, { firstScreenSubTitle } from "config";
import { fetchData } from "@/store/reducers/PostsDataSlice";
import baner from "@/assets/images/banner-3.jpg";
import { firstScreenTitle } from "config";
import { useWidth } from "@/components/utils/useWidth";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";

const HomeFirstScreen = () => {
  const textTitle = __("0001");
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

  console.log(" baner HomeFirstScreen", baner);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/banner-4.png")}
        style={styles.image}
      />
      <View style={[styles.overlay]}>
        <Text style={[styles.title, { fontSize: isMiddle ? 90 : 50 }]}>
          {firstScreenTitle}
        </Text>
        <Text style={[styles.subTitle, { fontSize: isMiddle ? 90 : 47 }]}>
          {firstScreenSubTitle}
        </Text>
        
      </View>

      <View style={{ position: "absolute", top: 20, left: 20 }}>
        <TabBarIcon
          color="#BCA37F"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 6 }, { rotate: "45deg" }],
              },
            }),
          ]}
          name="cart"
        />
      </View>

      <View style={{ position: "absolute", top: 60, left: 205 }}>
        <TabBarIcon
          color="#D0BFFF"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ rotate: "-5deg" }],
              },
            }),
          ]}
          name="logo"
        />
      </View>

      <View style={{ position: "absolute", top: 190, left: 33 }}>
        <TabBarIcon
          color="#B0D9B1"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 3 }, { rotate: "-15deg" }],
              },
            }),
          ]}
          name="more"
        />
      </View>

      <View style={{ position: "absolute", top: 290, left: 123 }}>
        <TabBarIcon
          color="#D2E0FB"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 4 }, { rotate: "15deg" }],
              },
            }),
          ]}
          name="explore"
        />
      </View>

      <View style={{ position: "absolute", top: 130, left: 163 }}>
        <TabBarIcon
          color="#D988B9"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 2.5 }, { rotate: "13deg" }],
              },
            }),
          ]}
          name="facebook"
        />
      </View>

      <View style={{ position: "absolute", top: 130, left: 283 }}>
        <TabBarIcon
          color="#1F4172"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 1.2 }, { rotate: "13deg" }],
              },
            }),
          ]}
          name="home"
        />
      </View>

      <View style={{ position: "absolute", top: 110, left: 90 }}>
        <TabBarIcon
          color="#CD5C08"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 1.7 }, { rotate: "13deg" }],
              },
            }),
          ]}
          name="search"
        />
      </View>

      <View style={{ position: "absolute", top: 170, left: 210 }}>
        <TabBarIcon
          color="#C44C58"
          style={[
            {},
            Platform.select({
              web: {
                transform: [{ scale: 1.3 }, { rotate: "13deg" }],
              },
            }),
          ]}
          name='sun'
        />
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
  image: {
    width: "100%",
    height: 600,
    alignSelf: "center",
    resizeMode: "cover",
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 2,
  },
  title: {
    fontSize: 100,
    fontWeight: "800",
    color: "rgba(255,255,255, 0.8)",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 7,
    marginBottom: -12,
  },
  subTitle: {
    fontSize: 100,
    fontWeight: "800",
    color: "rgba(0,0,0, 0.8)",
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 7,
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
});

export default HomeFirstScreen;
