import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { searchedPostsData } from "@/store/reducers/PostsSearchSlice";
import { searchedShopData } from "@/store/reducers/ShopsSearchSlice";
import { headerShownAction } from "@/store/reducers/HeaderShownSlice";
import { postsScrollToUpAction } from "@/store/reducers/ScrollToUpSlice";
import { scrollToUpAction } from "@/store/reducers/ScrollToUpSlice";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "config";

const ColorButtons = ({
  type,
  secondType,
  keyWords,
  route,
  justifyContent, 
  page
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postsData = useAppSelector((state) => state.postsData);
  const shopData  = useAppSelector((state) => state.shopData );

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const selectedInvertTheme = theme === "dark" ? Colors.light : Colors.dark
  const activeKeyWord = useAppSelector(
    (state) => state.postsScrollToUpSlice.keyWordHasCkliked
  );
  
  let data = []
  if ( page === "blog" ) {
    data = postsData
  } else {
    data = shopData
  };


  const scaleAnimation = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    startPulsatingAnimation();
  }, []);

  const startPulsatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const keywordsArray = keyWords.split(",").map((keyword) => keyword.trim());
  keywordsArray.push(`${type}`);
  keywordsArray.push(`${secondType}`);

  const uniqueKeywordsSet = new Set<string>(keywordsArray);
  const uniqueKeywordsArray: string[] = [...uniqueKeywordsSet];

  const redirectToBlogIndex = (argument: string) => {

    const filteredData = data.filter((item) => {
      return (
        item.type === argument ||
        item.secondType === argument ||
        item.keyWords.includes(argument)
      );
    });
    let keyWordHasCkliked = [];
    keyWordHasCkliked.push(`${argument}`);
    dispatch(headerShownAction("null"));
if ( page === "blog" ) {
    dispatch(searchedPostsData(filteredData))
  } else {
    dispatch(searchedShopData(filteredData))
    };

    dispatch(postsScrollToUpAction(keyWordHasCkliked))
    dispatch(scrollToUpAction());
    
    if (route !== "") {
      router.replace(route);
    }
  };
  const redirectToBlogIndexWithoutFilter = () => {
    dispatch(headerShownAction("filter"));
    dispatch(postsScrollToUpAction([]));
    dispatch(scrollToUpAction());
    if (route !== "") {
      router.replace(route);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: justifyContent }]}>
      {uniqueKeywordsArray.map((keyword, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => redirectToBlogIndex(keyword)} // Use onPress here
        >
          {activeKeyWord.includes(keyword) ? (
            <Animated.View
              style={[
                styles.box,
                {
                  transform: [{ scale: scaleAnimation }],
                  backgroundColor: selectedTheme.borderBottomLine,
                }, // Use Animated.View for scaling
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: selectedInvertTheme.text,
                  },
                ]}
              >
                {" "}
                {keyword}
              </Text>
            </Animated.View>
          ) : (
            <View
              style={[
                styles.box,
                {
                  backgroundColor: "#8b5cf6",
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: selectedTheme.text,
                  },
                ]}
              >
                # {keyword}
              </Text>
            </View>
          )}
        </TouchableWithoutFeedback>
      ))}
      <TouchableWithoutFeedback
        onPress={() => redirectToBlogIndexWithoutFilter()} // Use onPress here
      >
        <View
          style={[
            styles.box,
            {
              backgroundColor: "#a3e635",
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: selectedTheme.text,
              },
            ]}
          >
            @ ALL POSTS
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "100%",
    flexWrap: "wrap",
  },
  box: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    borderRadius: 6,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default React.memo(ColorButtons);
