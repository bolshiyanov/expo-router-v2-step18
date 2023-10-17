import React, { useMemo, useState } from "react";
import { Link } from "expo-router";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { DataShopTypeInterface } from "@/constants/types/dataShopType";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";
import { transformDate } from "@/components/utils/transformDate";
import { currency } from "config";
import AddToCartButton from "@/components/routesCompponents/ShopComponents/AddToCartButton";
interface RenderItemProps {
  langPage: any;
  item: DataShopTypeInterface;
}

const ShopSmallCardScreen: React.FC<RenderItemProps> = ({ langPage, item }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isProduction = process.env.NODE_ENV === "production";

  const [addedToTheCart, setAddedToTheCart] = useState(false);
  const sortType = useAppSelector((state) => state.sortTypeSlice.sortType);
  let typeSort = "";
  if (sortType === "publishDateNew" || sortType === "publishDateOld") {
    typeSort = "dateCreate";
  }

  if (sortType === "totalReadsLot" || sortType === "totalReadsLittle") {
    typeSort = "totalReads";
  }

  if (sortType === "likesLot" || sortType === "likesLittle") {
    typeSort = "like";
  }

  const bottonText = __("Add");
  const AddedToCartText = __("Already added to the cart");
  return (
    <>
      <View
        style={[styles.card, { backgroundColor: selectedTheme.backgroundNav }]}
      >
        <Image style={styles.image} source={{ uri: item.image }} />

        <View style={styles.contentContainer}>
          <Link
            href={`/${langPage}/shop/${
              isProduction ? item.path + ".html" : item.path
            }`}
            asChild
          >
            <Pressable>
              <View style={styles.topContentContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[styles.title, { color: selectedTheme.text }]}
                  >
                    {transformLanguageData("name", langPage, item)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.descriptionContainer,
                    { borderLeftColor: selectedTheme.borderBottomLine },
                  ]}
                >
                  <View
                    style={[
                      styles.gradientOverlay,
                      {
                        backgroundColor: "transparent",
                        backgroundImage: `linear-gradient(to bottom, ${selectedTheme.transporentTop},
                 ${selectedTheme.backgroundNav} )`,
                      },
                    ]}
                  />

                  <Text
                    numberOfLines={4}
                    ellipsizeMode="tail"
                    style={[
                      styles.description,
                      { color: selectedTheme.subTitle },
                    ]}
                  >
                    {transformLanguageData("descriptions", langPage, item)}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>

          <View style={styles.bottomContentContainer}>
            <View style={styles.buttonContainer}>
              <AddToCartButton
                id={item.id}
                name={transformLanguageData("name", langPage, item)}
                image={item.image}
                price={item.price}
              />
            </View>
            <View style={styles.priceContainer}>
              {item.price > 0 && (
                <>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
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
          </View>
        </View>
        {item.offer !== "" && (
          <View style={styles.offerContentContainer}>
            <Text style={styles.offer}>{item.offer}</Text>
          </View>
        )}
      </View>
      {typeSort !== "" && (
        <View
          style={[
            styles.numberContainer,
            { backgroundColor: selectedTheme.backgroundNav },
          ]}
        >
          <Text
            style={[
              styles.transformDate,
              { color: selectedTheme.borderBottomLine },
            ]}
          >
            {transformDate(item[typeSort])}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: 185,
    height: 225,
    marginHorizontal: 2,
    paddingHorizontal: 2,
    marginBottom: 80,
  },
  image: {
    aspectRatio: 1,
    width: "90%",
    marginTop: -70,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 6,
    height: 128,
    width: "100%",
    overflow: "hidden",
  },
  topContentContainer: {
    width: "100%",
    overflow: "hidden",
    height: 80,
    minHeight: 70,
    marginVertical: 6,
  },
  titleContainer: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 4,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 18,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    overflow: "hidden",
    borderLeftWidth: 3,
    position: "relative",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  description: {
    width: "100%",
    fontSize: 12,
    paddingLeft: 4,
    lineHeight: 12,
  },
  bottomContentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    overflow: "hidden",
    height: 30,
    minHeight: 30,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    fontSize: 11,
    fontWeight: "600",
    padding: 5,
    paddingBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: "center",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "37%",
    minWidth: "37%",
    marginRight: 4,
  },
  number: {
    fontSize: 12,
    fontWeight: "600",
    padding: 1,
  },
  offerContentContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    top: -60,
    left: 18,
    borderRadius: 18,
    backgroundColor: "red",
  },
  offer: {
    fontWeight: "800",
    color: "white",
    fontSize: 11,
    padding: 4,
    paddingBottom: 5,
  },
  numberContainer: {
    position: "absolute",
    right: 18,
    top: -56,
    padding: 3,
    borderRadius: 8,
    minWidth: 24,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  transformDate: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default React.memo(ShopSmallCardScreen);
