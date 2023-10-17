import React, { useDebugValue, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { ShippingRegion } from "@/constants/types/shippingTypes";
import { shippingArray } from "@/data/shippingArray";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { useDispatch } from "react-redux";
import { addRegionToDelivery } from "@/store/reducers/OrdersSlice";

const CustomModal = ({ id }) => {
  const countryTitle = __("Country/Region");
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const costumer = useAppSelector((state) => state.progressBarSlice.customer);
  const delivery = useAppSelector((state) => state.progressBarSlice.delivery);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(shippingArray[0].region);
  const [selectedValue, setSelectedValue] = useState(shippingArray[0].id);
  const [selectedTax, setSelectedTax] = useState(shippingArray[0].tax);

  const renderPickerItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        addRegionToDelivery({
          id,
          currentRegionId: selectedValue,
          currentRegion: selectedRegion,
          tax: selectedTax,
        })
      );
    }, [selectedValue]);

    return shippingArray.map((shipping) => (
      <View key={shipping.id}>
        <TouchableOpacity
          key={shipping.id}
          onPress={() => {
            setSelectedValue(shipping.id);
            setSelectedRegion(shipping.region);
            setSelectedTax(shipping.tax);
            setModalVisible(false);
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 18,
              color: selectedTheme.tint,
              paddingVertical: 10,
              overflow: "hidden",
            }}
          >
            {shipping.region}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => (costumer && !delivery ? setModalVisible(true) : null)}
        style={{
          height: 50,
          borderRadius: 6,
          backgroundColor: selectedTheme.backgroundSecond,
          borderWidth: 1,
          borderColor: costumer && !delivery
            ? selectedValue === "0"
              ? "red"
              : selectedTheme.tint
            : selectedTheme.borderLine,
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            color: costumer
              ? selectedValue === "0"
                ? "red"
                : selectedTheme.text
              : selectedTheme.borderLine,
            paddingVertical: 12,
            paddingHorizontal: 12,
          }}
        >
          {selectedRegion || "Select an option"}
        </Text>
        <View
          style={[
            {
              backgroundColor: selectedTheme.backgroundSecond,
              position: "absolute",
              bottom: 42,
              left: 16,
              maxWidth: 116,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              padding: 2,
              fontSize: 10,
              color: costumer ? selectedTheme.text : selectedTheme.borderLine,
            }}
          >
            {countryTitle}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              width: 280,
              maxHeight: 300,
              borderRadius: 8,
              backgroundColor: "white",
              paddingHorizontal: 12,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderPickerItems()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
