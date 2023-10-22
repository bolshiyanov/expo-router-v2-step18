import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
} from "react-native";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import ColorButtons from "../../ColorButtons";
import LikeComponent from "@/components/LikeComponent";
import Colors from "config";
import AddedToTheCartComponent from "./AddedToTheCartComponent";
import AddToShopComponent from "./AddToShopComponent";
import TotalPurchased from "./TotalPurchased";
import InStockComponent from "./InStockComponent";
import { currency } from "config";
import AddToCartButton from "./AddToCartButton";
import CartSlider from "@/components/CartComponents/CartSlider";
import { useWidth } from "@/components/utils/useWidth";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";

const BlogPagesComponent = ({ langPage }) => {
  const [openFullContent, setOpenFullContent] = useState(false);
  const isMiddleSize = useWidth(768);
  const data = useAppSelector((state) => state.shopData);
  const isProduction = process.env.NODE_ENV === "production";
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const [expanded, setExpanded] = useState(false);
  const [addedToTheCart, setAddedToTheCart] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentPageChangeAction("shop"));
  }, []);

  const toggleImageSize = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {}, [data]);

  if (!data) {
    return (
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator />;
      </View>
    );
  }

  const addedToCart = __("Already added to the cart");
  const { path } = useLocalSearchParams();

  let updatedPath = path;
  if (isProduction && typeof updatedPath === "string") {
    updatedPath = updatedPath.replace(".html", "");
  }
  const selectedPath = Array.isArray(updatedPath)
    ? updatedPath[0]
    : updatedPath;
  const item = data.find((c) => c.path.toString() === selectedPath);

  const readMore = __("Read more");

  return (
    <>
      <CartSlider
        size={isMiddleSize ? "middle" : "small"}
        langPage={langPage}
      />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: selectedTheme.background },
        ]}
      >
        {item && (
          <>
            <TouchableOpacity onPress={toggleImageSize}>
              <Image
                style={expanded ? styles.expandedImage : styles.originalImage}
                source={{ uri: item.image }}
              />
              {item.offer !== "" && (
                <View style={styles.offerContentContainer}>
                  <Text style={styles.offer}>{item.offer}</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={toggleImageSize}
                style={styles.expandedImageText}
              >
                <Text>{expanded ? " 16 : 9 " : " 1 : 1 "}</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.boxDetailsContainer}>
              <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: selectedTheme.text,
                      },
                    ]}
                  >
                    {" "}
                    {transformLanguageData("name", langPage, item)}{" "}
                  </Text>
                  <LikeComponent
                    id={item.id}
                    numbersLike={item.like}
                    page="shop"
                  />
                </View>
                <View style={styles.priceContainer}>
                  {item.price > 0 && (
                    <>
                      <Text
                        style={[
                          styles.number,
                          { color: selectedTheme.borderBottomLine },
                        ]}
                      >
                        {currency}
                      </Text>
                      <Text
                        style={[
                          styles.number,
                          { color: selectedTheme.borderBottomLine },
                        ]}
                      >
                        {item.price.toFixed(2)}
                      </Text>
                    </>
                  )}
                </View>

                <View style={{ marginHorizontal: 12 }}>
                  <ColorButtons
                    type={item.type}
                    secondType={item.secondType}
                    keyWords={item.keyWords}
                    route="../"
                    justifyContent={"flex-start"}
                    page="shop"
                  />
                  <View style={{ height: 12 }} />
                  <AddToShopComponent id={item.id} />
                  <TotalPurchased id={item.id} />

                  <AddedToTheCartComponent
                    id={item.id}
                    onClick={addedToTheCart}
                  />

                  <InStockComponent id={item.id} />
                </View>
                {item.descriptionsEn && (
                  <>
                    <Text
                      style={[
                        styles.detailsText,
                        {
                          color: selectedTheme.subTitle,
                          borderColor: selectedTheme.borderBottomLine,
                        },
                      ]}
                    >
                      {transformLanguageData("descriptions", langPage, item)}
                    </Text>

                    {!openFullContent && (
                      <TouchableOpacity
                        onPress={() => setOpenFullContent(true)}
                      >
                        <Text
                          style={[
                            styles.reedMore,
                            { color: selectedTheme.subTitle },
                          ]}
                        >
                          {readMore}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 60,
                      }}
                    >
                      <View style={styles.buttonContainer}>
                        <AddToCartButton
                          id={item.id}
                          name={transformLanguageData("name", langPage, item)}
                          image={item.image}
                          price={item.price}
                          size="middle"
                        />
                      </View>
                    </View>

                    <View style={{ height: 24 }} />
                    {openFullContent && (
                      <>
                        <Image
                          style={styles.expandedImage}
                          source={{ uri: item.image }}
                        />
                        <Text
                          style={[
                            styles.detailsText,
                            { color: selectedTheme.subTitle },
                          ]}
                        >
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                          <Text>{"\n\n"}</Text>
                          {transformLanguageData(
                            "descriptions",
                            langPage,
                            item
                          )}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 60,
                          }}
                        >
                          <View style={styles.buttonContainer}>
                            <AddToCartButton
                              id={item.id}
                              name={transformLanguageData(
                                "name",
                                langPage,
                                item
                              )}
                              image={item.image}
                              price={item.price}
                              size="middle"
                            />
                          </View>
                        </View>

                        <View style={{ height: 24 }} />
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
          </>
        )}
        <FooterComponent />
      </ScrollView>
    </>
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
    backgroundColor: "#FFFFFF",
  },
  originalImage: {
    width: "100%",
    aspectRatio: 24 / 9,
    alignSelf: "center",
  },
  expandedImage: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  expandedImageText: {
    position: "absolute",
    bottom: 5,
    right: 5,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 8,
    textTransform: "uppercase",
  },
  publishedTitle: {
    fontSize: 16,
    marginHorizontal: 4,
    marginTop: 16,
    marginBottom: 12,
  },
  boxDetailsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    maxWidth: 800,
    width: "100%",
  },
  reedMore: {
    fontSize: 20,
    fontWeight: "600",
    borderBottomWidth: 0,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  detailsText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    padding: 16,
    width: "100%",
  },

  offerContentContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    left: 10,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "red",
  },
  offer: {
    fontWeight: "800",
    color: "white",
    fontSize: 28,
    padding: 6,
    paddingBottom: 8,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 12,
    marginTop: 0,
  },
  number: {
    fontSize: 28,
    padding: 2,
    fontWeight: "600",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
});

export default React.memo(BlogPagesComponent);
