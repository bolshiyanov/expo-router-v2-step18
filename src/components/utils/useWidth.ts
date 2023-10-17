import { Platform, useWindowDimensions} from "react-native";

export function useWidth(size: number) {
    if (typeof window === "undefined") {
      return true;
    }
    const { width } = useWindowDimensions();
    if (Platform.OS === "ios" || Platform.OS === "android") {
      return false;
    }
    return width >= size;
  }