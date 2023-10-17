import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Platform,
} from "react-native";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors, { currency } from "config";
import { useWidth } from "@/components/utils/useWidth";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { DynamicInterface } from "@/constants/types/cartListTypes";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import {
  cartAdd,
  minusOneFromItem,
  removeOneItem,
} from "@/store/reducers/CartSlice";
interface RenderItemProps {
  langPage: any;
  item: DynamicInterface;
}

const CartsItem: React.FC<RenderItemProps> = ({ langPage, item }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isMiddle = useWidth(768);

  const name = transformLanguageData("name", langPage, item);

  

  const dispatch = useAppDispatch();

  const onPressPlus = () => {
    dispatch(cartAdd({ id: item.id, name, image: item.image, price: item.price }));

  };

  const onPressMenus = () => {
    if (item.number >= 1) {
      dispatch(minusOneFromItem(item.id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeOneItem(id));
  };

  const resoultPrice = parseFloat(item.price.toFixed(2)) * item.number

  return (
    <>
      <View
        style={[
          styles.container,
          {
            height: isMiddle ? 120 : 80,
          },
        ]}
      >
        <Image style={[styles.image]} source={{ uri: item.image }} />
        <View
          style={[
            styles.contentContainer,
            { height: isMiddle ? 120 : 80, width: isMiddle ? 384 : 224 },
          ]}
        >
          <View
            style={[
              styles.titleContainer,
              { marginTop: isMiddle ? -10 : -7, height: isMiddle ? 40 : 30 },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.title,
                { color: selectedTheme.text, fontSize: isMiddle ? 30 : 16 },
              ]}
            >
              {transformLanguageData("name", langPage, item)}
            </Text>
            <View style={{ marginRight: 4 }}>
              <Pressable onPress={() => handleRemoveItem(item.id)}>
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={selectedTheme.subTitle}
                    style={[
                      Platform.select({
                        web: {
                          transform: hovered
                            ? [{ scale: 1.1 }]
                            : [{ scale: 1 }],
                        },
                      }),
                      pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      },
                    ]}
                    name={isMiddle ? "trash-middle" : "trash-small"}
                  />
                )}
              </Pressable>
            </View>
          </View>

          <View
            style={[
              styles.titleContainer,
              {
                justifyContent: "flex-start",
                height: isMiddle ? 30 : 20,
                marginTop: isMiddle ? -12 : -6,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.title,
                {
                  color: selectedTheme.borderBottomLine,
                  fontSize: isMiddle ? 14 : 12,
                },
              ]}
            >
              {currency} {item.price.toFixed(2)}
            </Text>
          </View>

          <View style={[styles.bottomContainer]}>
            <View style={[styles.titleContainer, {}]}>
              <View
                style={[
                  styles.buttonsContainer,
                  { height: isMiddle ? 36 : 24 },
                ]}
              >
                <Pressable
                  onPress={onPressMenus}
                  style={[
                    styles.buttonsBlocks,
                    {
                      borderTopLeftRadius: 4,
                      borderBottomLeftRadius: 4,
                      backgroundColor: selectedTheme.subTitle,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.button,
                      {
                        fontSize: isMiddle ? 24 : 14,
                        color: selectedTheme.background,
                      },
                    ]}
                  >
                    -
                  </Text>
                </Pressable>
                <View
                  style={[
                    styles.buttonsBlocks,
                    {
                      borderTopWidth: 1,
                      borderBottomWidth: 1,

                      borderColor: selectedTheme.borderLine,
                      width: isMiddle ? 60 : 40,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.button,
                      {
                        fontWeight: "400",
                        fontSize: isMiddle ? 32 : 16,
                        color: selectedTheme.text,
                      },
                    ]}
                  >
                    {item.number}
                  </Text>
                </View>

                <Pressable
                  onPress={onPressPlus}
                  style={[
                    styles.buttonsBlocks,
                    {
                      borderTopRightRadius: 4,
                      borderBottomRightRadius: 4,
                      backgroundColor: selectedTheme.subTitle,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.button,
                      {
                        fontSize: isMiddle ? 24 : 14,
                        color: selectedTheme.background,
                      },
                    ]}
                  >
                    +
                  </Text>
                </Pressable>
              </View>

              <View style={{ }}>
                <Text numberOfLines={1} 
                ellipsizeMode='tail'
                  style={{
                    textAlign: "right",
                    marginRight: 12,
                    color: selectedTheme.subTitle,
                    fontSize: isMiddle ? 42 : 20,
                  }}
                >
                  {currency}
                  {resoultPrice.toFixed(2) }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.separador,
          {
            borderBottomColor: selectedTheme.borderLine,
            height: isMiddle ? 24 : 12,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    aspectRatio: 1,
    height: "100%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: 12,
    textTransform: "uppercase",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    maxWidth: "100%",
    marginLeft: 24,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonsBlocks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    height: "100%",
  },
  button: {
    fontWeight: "800",
    paddingBottom: 3,
  },
  separador: {
    width: "100%",
    borderBottomWidth: 1,
  },
});

export default CartsItem;
