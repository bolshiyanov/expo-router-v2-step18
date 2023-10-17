import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import CartHeader from "../CartHeader";
import CartFooter from "../CartFooter";
import uniqueData from "@/components/utils/uniqueData";
import CartsItem from "../CartsItem";
import { supportedLang } from "config";




const CartListComponent = ({ size, langPage }) => {

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const dataCart= useAppSelector((state) => state.cartSlice );  
  const shopData = useAppSelector((state) => state.shopData);
  
  function generateCartShopData(item) {
    const cartItem = {
      id: item.id,
      image: item.image,
      price: item.price,
    };
  
    supportedLang.forEach((langObj) => {
      const langKey = Object.keys(langObj)[0];
      const fieldName = `name${langKey.charAt(0).toUpperCase()}${langKey.slice(1)}`;
      cartItem[fieldName] = item[fieldName];
    });
  
    return cartItem;
  }
  
  const cartShopData = shopData.map((item) => generateCartShopData(item));
  

  
  const cart = dataCart.map((item) => ({
    id: item.id,
    number: item.number,
  }));

  const itemsInCart = cartShopData.map((cartItem) => {
    const cartItemInCart = cart.find((item) => item.id === cartItem.id);
  
    if (cartItemInCart) {
      const cartItemWithLangFields = {
        id: cartItem.id,
        image: cartItem.image,
        price: cartItem.price,
        number: cartItemInCart.number,
      };
  
      supportedLang.forEach((langObj) => {
        const langKey = Object.keys(langObj)[0];
        const fieldName = `name${langKey.charAt(0).toUpperCase()}${langKey.slice(1)}`;
        cartItemWithLangFields[fieldName] = cartItem[fieldName];
      });
  
      return cartItemWithLangFields;
    }
  }).filter((item) => item !== null && item !== undefined);



  return (
    <View
      style={[
        styles.containerForMenu,
        {
          backgroundColor: selectedTheme.backgroundNav,
          borderLeftColor: selectedTheme.borderLine,
          top: size === "small" ? 60 : 120,
          width: size === "small" ? 330 : 530,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: selectedTheme.backgroundNav,
            borderLeftColor: selectedTheme.borderLine,
          },
        ]}
      >
       <FlatList
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          data={uniqueData(itemsInCart)}
          renderItem={({ item, index }) => (
            <CartsItem item={item} langPage={langPage} key={index.toString()} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={1}
          key={size} 
          snapToInterval={100}
          decelerationRate="fast"
          contentContainerStyle={{ marginRight: 12 }}
          ListHeaderComponent={<CartHeader />}
          ListFooterComponent={<CartFooter langPage={langPage}/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerForMenu: {
    position: "absolute",
    right: 0,
    width: 530,
    borderLeftWidth: 1,
    height: "100%",
    zIndex: 2,
  },

  container: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "flex-start",
    width: "100%",
    paddingRight: 12,
  },

  item: {
    marginBottom: 12,
    marginLeft: 6,
  },
  headerContainer: {
    borderTopWidth: 1,
    marginVertical: 12,
    padding: 6,
    marginRight: 18,
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 14,
  },
});

export default CartListComponent;
