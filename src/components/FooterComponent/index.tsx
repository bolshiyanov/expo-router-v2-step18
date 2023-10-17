import React from "react";
import {
  Platform,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { useAppSelector } from "@/components/utils/hooks/redux";
import ChangeLangButton from "../LanguageComponents/ChangeLangButton";
import { __ } from "../LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";

const FooterComponent = () => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View
      style={[
        styles.footer,
        { backgroundColor: selectedTheme.backgroundNav },
        { borderColor: selectedTheme.borderLine },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.footerCol}>
            <Text
              style={[
                styles.heading,
                {
                  borderColor: selectedTheme.borderBottomLine,
                  color: selectedTheme.text,
                },
              ]}
            >
              {__("company")}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("about us")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("our services")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("privacy policy")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("affiliate program")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerCol}>
            <Text
              style={[
                styles.heading,
                {
                  borderColor: selectedTheme.borderBottomLine,
                  color: selectedTheme.text,
                },
              ]}
            >
              {__("Supported languages")}
            </Text>

            <ChangeLangButton />
          </View>
          <View style={styles.footerCol}>
            <Text
              style={[
                styles.heading,
                {
                  borderColor: selectedTheme.borderBottomLine,
                  color: selectedTheme.text,
                },
              ]}
            >
              {__("get help")}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("FAQ")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("shipping")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("returns")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("order status")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.link, { color: selectedTheme.subTitle }]}>
              {__("payment options")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerCol}>
            <Text
              style={[
                styles.heading,
                {
                  borderColor: selectedTheme.borderBottomLine,
                  color: selectedTheme.text,
                },
              ]}
            >
              {__("follow us")}
            </Text>
            <View style={styles.socialLinks}>
              {/* /social icons */}
              <View style={styles.socialLink}>
                <Pressable onPress={() => {}}>
                  {({ pressed, hovered }) => (
                    <TabBarIcon
                      color={selectedTheme.iconColors}
                      style={[
                        {},
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
                      name="instagram"
                    />
                  )}
                </Pressable>
              </View>

              <View style={styles.socialLink}>
                <Pressable onPress={() => {}}>
                  {({ pressed, hovered }) => (
                    <TabBarIcon
                      color={selectedTheme.iconColors}
                      style={[
                        {},
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
                      name="facebook"
                    />
                  )}
                </Pressable>
              </View>

              <View style={styles.socialLink}>
                <Pressable onPress={() => {}}>
                  {({ pressed, hovered }) => (
                    <TabBarIcon
                      color={selectedTheme.iconColors}
                      style={[
                        {},
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
                      name="youtube"
                    />
                  )}
                </Pressable>
              </View>

              <View style={styles.socialLink}>
                <Pressable onPress={() => {}}>
                  {({ pressed, hovered }) => (
                    <TabBarIcon
                      color={selectedTheme.iconColors}
                      style={[
                        {},
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
                      name="twitter"
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 70,
    paddingHorizontal: 0,
    borderTopWidth: 1,
  },
  container: {
    maxWidth: 1170,
    marginHorizontal: "auto",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footerCol: {
    width: "25%",
    minWidth: 255,
    padding: 0,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    color: "#ffffff",
    textTransform: "capitalize",
    marginBottom: 15,
    paddingBottom: 12,
    fontWeight: "500",
    position: "relative",
    borderBottomWidth: 3,
    borderStyle: "solid",
  },
  link: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#ffffff",
    textDecorationLine: "none",
    fontWeight: "300",

    marginBottom: 10,
  },
  socialLinks: {
    flexDirection: "row",
    marginTop: 10,
  },
  socialLink: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  icon: {
    color: "#ffffff",
  },
});

export default FooterComponent;
