import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { StyleSheet, Text, View } from "react-native";
import Colors from "config";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";
import { useEffect } from "react";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";

export default function IndexComponent() {
  const theme = useAppSelector((state) => state.themeSlice.theme);

  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentPageChangeAction("index"));
  }, []);

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
            CASA
          </Text>
          <Text style={[styles.subtitle, { color: selectedTheme.tint }]}>
            Va a Explore pagina web
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
