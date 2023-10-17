import React, { useEffect } from "react";
import {
  Platform,
  Pressable,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { TabBarIcon } from "./navigatorComponents/tab-bar-icon";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { likeAdd } from "@/store/reducers/LikeSlice";
import { fetchLikeData } from "@/store/reducers/LikeSlice";

const LikeComponent = ({ id, numbersLike, page }) => {
    const existingLike = useAppSelector((state) =>
      state.likeSlice.find((item) => item.id === id && item.page === page)
    );
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchLikeData());
    }, [dispatch]);
  
    const toggleLikeChange = () => {
      const updatedLikeStatus = !existingLike?.like;
  
      const updatedLikeData: { id: string; like: boolean; page: string } = {
        id: id.toString(),
        like: updatedLikeStatus,
        page: page.toString(),
      };
  
      dispatch(likeAdd(updatedLikeData));
    };
  
    let likes = numbersLike;
  

    if (existingLike && existingLike.like) {
      likes = numbersLike + 1;
    }
  
    return (
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: existingLike?.like ? "#3b82f6" : "#374151" },
        ]}
      >
        <Pressable onPress={toggleLikeChange}>
          {({ pressed, hovered }) => (
            <TabBarIcon
              color="white"
              style={[
                ,
                Platform.select({
                  web: {
                    transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                  },
                }),
                pressed && {
                  transform: [{ scale: 0.9 }],
                  opacity: 0.8,
                },
              ]}
              name="like"
            />
          )}
        </Pressable>
  
        <Text style={[styles.text]}> {likes}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    marginTop: 5,
    borderRadius: 8,
    minWidth: 80,
    maxWidth: 80,
    marginHorizontal: 4,
    marginRight: 16
  },
  text: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});

export default LikeComponent;
