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
}

const RenderPostMovilComponent: React.FC<RenderItemProps> = ({
  langPage,
  item,
}) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isProduction = process.env.NODE_ENV === "production";

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
    <View style={[styles.card]}>
      <View style={[styles.firstContainer]}>
        <View
          style={[
            styles.squaer,
            {
              backgroundColor: selectedTheme.backgroundNav,
            },
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
        <View style={[styles.textContainer, { alignItems: "flex-start" }]}>
          <Text style={[styles.title, { color: selectedTheme.text }]}>
            {transformLanguageData("name", langPage, item)}
          </Text>
          <ColorButtons
            key={item.id}
            type={item.type}
            secondType={item.secondType}
            keyWords={item.keyWords}
            route=""
            justifyContent={"flex-start"}
            page="blog"
          />
          <View
            style={[
              styles.descriptionContainer,
              { borderColor: selectedTheme.borderBottomLine },
            ]}
          >
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
            styles.numberContainer,
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
    flexDirection: "column",
    maxWidth: 500,
    position: "relative",
    marginBottom: 16,
    overflow: "hidden",
  },
  firstContainer: {
    width: "100%",
    height: 380,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    aspectRatio: 1,
    width: "90%",
  },
  squaer: {
    position: "absolute",
    height: 190,
    width: "100%",
    bottom: 0,
  },
  secondContainer: {
    display: "flex",
    width: "100%",
    height: 380,
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
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    borderLeftWidth: 5,
    marginVertical: 12,
    paddingLeft: 12,
    flexWrap: "wrap",
    maxHeight: 75,
    maxWidth: "100%",
  },
  subtitle: {
    flex: 1,
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
    fontWeight: '600'
  },

  bottomContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 12,
    flexWrap: "wrap",
  },
  numberContainer: {
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
  number: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default React.memo(RenderPostMovilComponent);
