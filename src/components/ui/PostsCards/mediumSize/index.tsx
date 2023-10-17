import React, { useMemo } from "react";
import { Link } from "expo-router";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { DataPostsTypeInterface } from "@/constants/types/dataPostsType";
import { transformDate } from "@/components/utils/transformDate";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import ColorButtons from "@/components/ColorButtons";
import Colors from "config";

interface RenderItemProps {
  langPage: any;
  item: DataPostsTypeInterface;
  index: number;
}

const RenderPostMiddleSizeComponent: React.FC<RenderItemProps> = ({
  langPage,
  item,
  index,
}) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isProduction = process.env.NODE_ENV === "production";

  function isEven(number) {
    return number % 2 === 0;
  }
  console.log("isEven ", isEven(index));

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

  const bottonText = __("Read more");

  return (
    <View
      style={[
        styles.card,
        { flexDirection: isEven(index) ? "row" : "row-reverse" },
      ]}
    >
      <View style={[styles.firstContainer]}>
        <View
          style={[
            styles[isEven(index) ? "squaerLeft" : "squaerRight"],
            { backgroundColor: selectedTheme.backgroundNav },
          ]}
        ></View>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>

      <View
        style={[
          styles.secondContainer,
          { backgroundColor: selectedTheme.backgroundNav },
        ]}
      >
        <View
          style={[
            styles.textContainer,
            { alignItems: isEven(index) ? "flex-start" : "flex-end" },
          ]}
        >
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.title, { color: selectedTheme.text }]}
          >
            {transformLanguageData("name", langPage, item)}
          </Text>
          <ColorButtons
            key={item.id}
            type={item.type}
            secondType={item.secondType}
            keyWords={item.keyWords}
            route=""
            justifyContent={isEven(index) ? "flex-start" : "flex-end"}
            page="blog"
          />
          <View
            style={[
              styles[
                isEven(index)
                  ? "descriptionContainerLeft"
                  : "descriptionContainerRight"
              ],
              { borderColor: selectedTheme.borderBottomLine },
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
              style={[
                {
                  flexWrap: "wrap",

                  color: selectedTheme.subTitle,
                },
              ]}
            >
              {transformLanguageData("descriptions", langPage, item)}
            </Text>
          </View>
          <Link
            href={`/${langPage}/blog/${
              isProduction ? item.path + ".html" : item.path
            }`}
            asChild
          >
            <Pressable>
              <Text style={[styles.button, { color: selectedTheme.text }]}>
                {bottonText}
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {typeSort !== "" && (
        <View
          style={[
            styles[
              isEven(index) ? "numberContainerRight" : "numberContainerLeft"
            ],
            { backgroundColor: selectedTheme.backgroundNav },
          ]}
        >
          <Text
            style={[styles.number, { color: selectedTheme.borderBottomLine }]}
          >
            {transformDate(item[typeSort])}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: 1024,
    position: "relative",
    marginHorizontal: 8,
    marginBottom: 16,
    overflow: "hidden",
    paddingHorizontal: 16,
  },
  firstContainer: {
    flex: 1,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    height: 280,
    paddingVertical: 16,
    position: "relative",
  },
  image: {
    aspectRatio: 19 / 9,
    height: "100%",
  },
  squaerLeft: {
    position: "absolute",
    height: 280,
    width: 300,
    right: 0,
    top: 0,
  },
  squaerRight: {
    position: "absolute",
    height: 280,
    width: 300,
    left: 0,
    top: 0,
    backgroundColor: "green",
  },
  secondContainer: {
    display: "flex",
    width: "55%",
    height: 280,
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",

    padding: 24,
    height: "100%",
  },

  title: {
    overflow: "hidden",
    fontSize: 24,
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  descriptionContainerLeft: {
    flex: 1,
    overflow: "hidden",
    borderLeftWidth: 5,
    marginVertical: 12,
    paddingLeft: 12,
    flexWrap: "wrap",
    maxHeight: 75,
  },
  descriptionContainerRight: {
    flex: 1,
    overflow: "hidden",
    borderRightWidth: 5,
    marginVertical: 12,
    paddingRight: 12,
    flexWrap: "wrap",
    maxHeight: 75,
    textAlign: "right",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    flexWrap: "wrap",
  },
  buttonContainer: {
    padding: 6,
  },

  button: {
    fontSize: 18,
    fontWeight: "600",
  },

  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },

  bottomContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 12,
    flexWrap: "wrap",
  },
  numberContainerRight: {
    position: "absolute",
    right: 25,
    top: 5,
    padding: 3,
    borderRadius: 8,
    minWidth: 24,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  numberContainerLeft: {
    position: "absolute",
    left: 25,
    top: 5,
    padding: 3,
    borderRadius: 8,
    minWidth: 24,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },

  number: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default React.memo(RenderPostMiddleSizeComponent);
