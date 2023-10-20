import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { StyleSheet, Text, View } from "react-native";
import Colors from "config";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";
import { useEffect } from "react";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import HomeFirstScreen from "../HomeScreens/HomeFirstScreen";

export default function IndexComponent({langPage}) {
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
          { backgroundColor: selectedTheme.backgroundSecond },
        ]}
      >
        <View style={styles.main}>
          <HomeFirstScreen/>
          
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
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    width:'100%',
    
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
