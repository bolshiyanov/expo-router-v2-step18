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
  const ILookAJobTitle = __("I look a job")
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
        source={require("@/assets/images/backgrondBase.jpg")}
        style={[styles.image,{zIndex: 1}]}
      />
      <View style={[styles.lookJob, { zIndex: 2 }]}>
        <TabBarIcon
          color={selectedTheme.check}
          style={[
            Platform.select({
              web: {
                transform: [{ scale: 1.1 }],
              },
            }),
          ]}
          name="briefcase"
        />
        <Text style={{ color: selectedTheme.check, fontWeight: '800', fontSize: 20, paddingLeft: 12}}>{ILookAJobTitle}</Text>
      </View>
      <Image
        source={require("@/assets/images/banner-4.png")}
        style={styles.imageBackground}
      />
      
      <View style={[styles.overlay]}>
        <Text style={[styles.title, { fontSize: isMiddle ? 90 : 50 }]}>
          {firstScreenTitle}
        </Text>
        <Text style={[styles.subTitle, { fontSize: isMiddle ? 90 : 47 }]}>
          {firstScreenSubTitle}
        </Text>
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
    height: 600,
    alignSelf: "center",
    resizeMode: "cover",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
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
  lookJob: {
    position: 'absolute',
    top : 12,
    left: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

export default HomeFirstScreen;
