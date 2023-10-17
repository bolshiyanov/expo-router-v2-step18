import { StyleSheet, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import CheckOutTextComponent from "../../../ui/TitleSubtitleComponent";
import { useAppSelector } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import NumberInRoundTextComponent from "@/components/ui/NumberInRoundTextComponent";
import InputWithTitle from "@/components/ui/InputWithTitle";
import SwitchButton from "@/components/ui/SwitcherButton";
import PressableButton from "@/components/common/PressableButton";
import { useWidth } from "@/components/utils/useWidth";
import { useDispatch } from "react-redux";
import {
  addCustomersBillingAndDelivery,
  addCustomersBillingSeparateDelivery,
} from "@/store/reducers/OrdersSlice";
import { DeliveryInProgressBarAction } from "@/store/reducers/ProgressBarSlice";
import CustomModal from "@/components/common/CustomModal";

const CheckoutRightBilling = ({ order }) => {
  const dispatch = useDispatch();
  const customerTitle = __("Customer");
  const adressTitle = __("Fill in your Billing/Shipping Address");
  const emailTitle = __("Your email address");
  const billingAdress = __("Billing address");
  const firstNameTitle = __("First name");
  const lastNameTitle = __("Last name");
  const addressLine1Title = __("Address line 1");
  const addressLine2Title = __("Address line 2");
  const cityTitle = __("City");
  const countryTitle = __("Country/Region");
  const provinceTitle = __("Province/State");
  const zipCodeTitle = __("Zip code");
  const phoneNumberTitle = __("Phone");
  const shipTitle = __("Ship to different address");
  const continueToDelivery = __("Continue to delivery");
  const deliveryAdress = __("Shipping Address");

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const customer = useAppSelector((state) => state.progressBarSlice.customer);
  const delivery = useAppSelector((state) => state.progressBarSlice.delivery);

  const [useDifferenAddress, setUseDifferenAddress] = useState(false);

  const [billingEmail, setBillingEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");

  const [firstDeliveryName, setFirstDeliveryName] = useState("");
  const [lastDeliveryName, setLastDeliveryName] = useState("");
  const [addressDeliveryLine1, setAddressDeliveryLine1] = useState("");
  const [addressDeliveryLine2, setAddressDeliveryLine2] = useState("");
  const [cityDelivery, setCityDelivery] = useState("");
  const [countryDelivery, setCountryDelivery] = useState("");
  const [provinceDelivery, setProvinceDelivery] = useState("");
  const [zipCodeDelivery, setZipCodeDelivery] = useState("");
  const [phoneDelivery, setPhoneDelivery] = useState("");
  const [isRegion, setIsRegion] = useState(false);
  const currentedRegion = order.currentRegion;

  const isMiddle = useWidth(768);
  const handleBillingEmail = (data: string) => {
    setBillingEmail(data);
  };
  const handleBillingFirstName = (data: string) => {
    setFirstName(data);
  };
  const handleBillingLastName = (data: string) => {
    setLastName(data);
  };
  const handleBillingAddressLine1 = (data: string) => {
    setAddressLine1(data);
  };
  const handleBillingAddressLine2 = (data: string) => {
    setAddressLine2(data);
  };
  const handleBillingCity = (data: string) => {
    setCity(data);
  };
  const handleBillingCountry = (data: string) => {
    setCountry(data);
  };
  const handleBillingProvince = (data: string) => {
    setProvince(data);
  };
  const handleBillingZipCode = (data: string) => {
    setZipCode(data);
  };
  const handleBillingPhone = (data: string) => {
    setPhone(data);
  };

  const handleDeliveryFirstName = (data: string) => {
    setFirstDeliveryName(data);
  };
  const handleDeliveryLastName = (data: string) => {
    setLastDeliveryName(data);
  };
  const handleDeliveryAddressLine1 = (data: string) => {
    setAddressDeliveryLine1(data);
  };
  const handleDeliveryAddressLine2 = (data: string) => {
    setAddressDeliveryLine2(data);
  };
  const handleDeliveryCity = (data: string) => {
    setCityDelivery(data);
  };
  const handleDeliveryCountry = (data: string) => {
    setCountryDelivery(data);
  };
  const handleDeliveryProvince = (data: string) => {
    setProvinceDelivery(data);
  };
  const handleDeliveryZipCode = (data: string) => {
    setZipCodeDelivery(data);
  };
  const handleDeliveryPhone = (data: string) => {
    setPhoneDelivery(data);
  };

  const number1 = 1;
  const fontSize22 = 22;
  const fontSize18 = 18;
  const backGroundColor = "backgroundSecond";

  const switchToSipping = (isEnabled) => {
    setUseDifferenAddress(isEnabled);
  };

  useEffect(() => {
    if (currentedRegion !== "0") {
      setIsRegion(true);
    }
  }, [order]);

  let readyToBothDispatch = false;
  if (
    billingEmail !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    addressLine1 !== "" &&
    addressLine2 !== "" &&
    province !== "" &&
    city !== "" &&
    zipCode !== "" &&
    phone !== ""
  ) {
    readyToBothDispatch = true;
  }
  let readyToDeliveryDispatch = false;
  if (
    firstDeliveryName !== "" &&
    lastDeliveryName !== "" &&
    addressDeliveryLine1 !== "" &&
    addressDeliveryLine2 !== "" &&
    provinceDelivery !== "" &&
    cityDelivery !== "" &&
    zipCodeDelivery !== "" &&
    phoneDelivery !== ""
  ) {
    readyToDeliveryDispatch = true;
  }

  const addBothAdresses = () => {
    dispatch(DeliveryInProgressBarAction());
    dispatch(
      addCustomersBillingAndDelivery({
        id: order?.id ?? 0,
        billingEmail,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        province,
        zipCode,
        phone,
      })
    );
  };

  const addSeparateAdresses = () => {
    dispatch(DeliveryInProgressBarAction());
    dispatch(
      addCustomersBillingSeparateDelivery({
        id: order?.id ?? 0,
        billingEmail,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        province,
        zipCode,
        phone,
        city,
        cityDelivery,
        firstDeliveryName,
        lastDeliveryName,
        addressDeliveryLine1,
        addressDeliveryLine2,
        provinceDelivery,
        zipCodeDelivery,
        phoneDelivery,
      })
    );
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={{ marginTop: 2 }}>
            <NumberInRoundTextComponent
              number={number1}
              active={customer}
              fontSize={fontSize22}
            />
          </View>
          <CheckOutTextComponent
            title={customerTitle}
            subTitle={adressTitle}
            active={customer}
            border={false}
            fontSize={fontSize18}
          />
        </View>
        <View style={{ marginTop: 24 }} />
        <View style={{ marginRight: 12, marginLeft: 50 }}>
          <InputWithTitle
            placeholder="examlpe@email.com"
            title=""
            inputName={emailTitle}
            onInputChange={handleBillingEmail}
            active={customer && !delivery}
            backGroundColor={backGroundColor}
            autoComplete="email"
            keyboardType="email-address"
          />
          <View style={styles.twoInputsContainer}>
            <View
              style={{
                width: isMiddle ? "47%" : "44%",
              }}
            >
              <InputWithTitle
                placeholder="Adam"
                title={billingAdress}
                inputName={firstNameTitle}
                onInputChange={handleBillingFirstName}
                active={customer && !delivery}
                backGroundColor={backGroundColor}
                autoComplete="name"
                keyboardType="default"
              />
            </View>
            <View
              style={{
                width: 12,
              }}
            />
            <View
              style={{
                width: "48%",
              }}
            >
              <InputWithTitle
                placeholder="Stoun"
                title=""
                inputName={lastNameTitle}
                onInputChange={handleBillingLastName}
                active={customer && !delivery}
                backGroundColor={backGroundColor}
                autoComplete="name"
                keyboardType="default"
              />
            </View>
          </View>
          <InputWithTitle
            placeholder="123 Main Street "
            title=""
            inputName={addressLine1Title}
            onInputChange={handleBillingAddressLine1}
            active={customer && !delivery}
            backGroundColor={backGroundColor}
            autoComplete="street-address"
            keyboardType="default"
          />

          <InputWithTitle
            placeholder="Apt 4B"
            title=""
            inputName={addressLine2Title}
            onInputChange={handleBillingAddressLine2}
            active={customer && !delivery}
            backGroundColor={backGroundColor} 
            autoComplete="street-address"
            keyboardType="default"
          />

          <InputWithTitle
            placeholder="London"
            title=""
            inputName={cityTitle}
            onInputChange={handleBillingCity}
            active={customer && !delivery}
            backGroundColor={backGroundColor}
            autoComplete="name"
            keyboardType="default"
          />

          <View
            style={{
              height: 18,
            }}
          />
          <CustomModal id={order?.id ?? ""} />

          <View style={styles.twoInputsContainer}>
            <View
              style={{
                width: isMiddle ? "47%" : "44%",
              }}
            >
              <InputWithTitle
                placeholder="Yorkshire"
                title=""
                inputName={provinceTitle}
                onInputChange={handleBillingProvince}
                active={customer && !delivery}
                backGroundColor={backGroundColor}
                autoComplete="name"
                keyboardType="default"
              />
            </View>
            <View
              style={{
                width: 12,
              }}
            />
            <View
              style={{
                width: "48%",
              }}
            >
              <InputWithTitle
                placeholder="YO1"
                title=""
                inputName={zipCodeTitle}
                onInputChange={handleBillingZipCode}
                active={customer && !delivery}
                backGroundColor={backGroundColor}
                autoComplete="street-address"
                keyboardType="default"
              />
            </View>

            <InputWithTitle
              placeholder="00 34 123 345 567"
              title=""
              inputName={phoneNumberTitle}
              onInputChange={handleBillingPhone}
              active={customer && !delivery}
              backGroundColor={backGroundColor}
              autoComplete="tel"
              keyboardType="phone-pad"
            />
          </View>

          {!delivery && (<View
            style={{
              width: "100%",
              borderBottomColor: selectedTheme.borderLine,
              borderBottomWidth: 1,
              marginTop: 24,
            }}
          />)}

          {customer && !delivery &&(
            <>
              <SwitchButton
                initialValue={false}
                onToggle={switchToSipping}
                title={shipTitle}
              />
              {!useDifferenAddress &&
                readyToBothDispatch &&
                isRegion &&
                !delivery && (
                  <PressableButton
                    onPress={addBothAdresses}
                    title={continueToDelivery}
                  />
                )}

              {/* Different address to delivery */}
              {useDifferenAddress && (
                <>
                  <View style={[styles.twoInputsContainer, { marginTop: 24 }]}>
                    <View
                      style={{
                        width: isMiddle ? "47%" : "44%",
                      }}
                    >
                      <InputWithTitle
                        placeholder="Adam"
                        title={deliveryAdress}
                        inputName={firstNameTitle}
                        onInputChange={handleDeliveryFirstName}
                        active={customer && !delivery}
                        backGroundColor={backGroundColor}
                        autoComplete="name"
                        keyboardType="default"
                      />
                    </View>
                    <View
                      style={{
                        width: 12,
                      }}
                    />
                    <View
                      style={{
                        width: "48%",
                      }}
                    >
                      <InputWithTitle
                        placeholder="Stoun"
                        title=""
                        inputName={lastNameTitle}
                        onInputChange={handleDeliveryLastName}
                        active={customer && !delivery}
                        backGroundColor={backGroundColor}
                        autoComplete="name"
                        keyboardType="default"
                      />
                    </View>
                  </View>
                  <InputWithTitle
                    placeholder="123 Main Street "
                    title=""
                    inputName={addressLine1Title}
                    onInputChange={handleDeliveryAddressLine1}
                    active={customer && !delivery}
                    backGroundColor={backGroundColor}
                    autoComplete="street-address"
                    keyboardType="default"
                  />

                  <InputWithTitle
                    placeholder="Apt 4B"
                    title=""
                    inputName={addressLine2Title}
                    onInputChange={handleDeliveryAddressLine2}
                    active={customer && !delivery}
                    backGroundColor={backGroundColor}
                    autoComplete="street-address"
                    keyboardType="default"
                  />

                  <InputWithTitle
                    placeholder="London"
                    title=""
                    inputName={cityTitle}
                    onInputChange={handleDeliveryCity}
                    active={customer && !delivery}
                    backGroundColor={backGroundColor}
                    autoComplete="name"
                    keyboardType="default"
                  />

                  <View style={styles.twoInputsContainer}>
                    <View
                      style={{
                        width: isMiddle ? "47%" : "44%",
                      }}
                    >
                      <InputWithTitle
                        placeholder="Yorkshire"
                        title=""
                        inputName={provinceTitle}
                        onInputChange={handleDeliveryProvince}
                        active={customer && !delivery}
                        backGroundColor={backGroundColor}
                        autoComplete="name"
                        keyboardType="default"
                      />
                    </View>
                    <View
                      style={{
                        width: 12,
                      }}
                    />
                    <View
                      style={{
                        width: "48%",
                      }}
                    >
                      <InputWithTitle
                        placeholder="YO1"
                        title=""
                        inputName={zipCodeTitle}
                        onInputChange={handleDeliveryZipCode}
                        active={customer && !delivery}
                        backGroundColor={backGroundColor}
                        autoComplete="street-address"
                        keyboardType="default"
                      />
                    </View>

                    <InputWithTitle
                      placeholder="00 34 123 345 567"
                      title=""
                      inputName={phoneNumberTitle}
                      onInputChange={handleDeliveryPhone}
                      active={customer && !delivery}
                      backGroundColor={backGroundColor}
                      autoComplete="tel"
                      keyboardType="phone-pad"
                    />
                  </View>
                </>
              )}

              {useDifferenAddress && isRegion && !delivery && (
                <PressableButton
                  onPress={addSeparateAdresses}
                  title={continueToDelivery}
                />
              )}
            </>
          )}
          <View
            style={{
              width: "100%",
              borderBottomColor: selectedTheme.borderLine,
              borderBottomWidth: 1,
              marginTop: 24,
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 500,
    flexDirection: "column",
    margin: 12,
    justifyContent: "flex-start",
  },

  headerContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 12,
  },
  twoInputsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    maxWidth: "100%",
    flexWrap: "wrap",
  },
});

export default CheckoutRightBilling;
