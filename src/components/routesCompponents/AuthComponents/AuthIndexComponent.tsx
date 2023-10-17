import { useAppSelector } from "@/components/utils/hooks/redux";
import { Platform, StyleSheet, Text, View } from "react-native";
import Colors from "config";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";

export default function AuthIndexComponent() {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { backgroundColor: selectedTheme.background },
        ]}
      >
        <View style={styles.main}>
          <Text style={[styles.title, { color: selectedTheme.text }]}>
            SignIn SignUp
          </Text>
          <Text style={[styles.subtitle, { color: selectedTheme.subTitle }]}>
            It is {Platform.OS} and mi theme is {theme}{" "}
          </Text>
        </View>
      </View>
      <FooterComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
