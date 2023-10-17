import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import { discountData } from "config";
import { useWidth } from "@/components/utils/useWidth";
import { currency } from "config";
import { cartAllRemove } from "@/store/reducers/CartSlice";
import { CartSliderIsClosedAction } from "@/store/reducers/CartSlider";
import { createNewOrder, fetchOrder } from "@/store/reducers/OrdersSlice";
import { currentPageChangeAction } from "@/store/reducers/CurrentPageSlice";
import PressableButton from "@/components/common/PressableButton";

const CartPromo = ({ totalAmount, langPage }) => {
  const total = __("Total");
  const havePromo = __("Have a promo code?");
  const yourDiscount = __("Your discount is");
  const placeHolder = __("Gift card or coupon code");
  const apply = __("Apply");
  const info = __("Invalid token - The access token you provided is invalid");
  const checkOutText = __("Checkout");
  const closeCart = __("Close cart");
  const isMiddle = useWidth(768);
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const dataCart = useAppSelector((state) => state.cartSlice);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const [isError, setIsError] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [totalNewAmount, setTotalNewAmount] = useState<number>(totalAmount);

  const router = useRouter();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchOrder())
  // }, []);

  const checkout = () => {
    if (totalAmount === 0) {
      dispatch(cartAllRemove());
      dispatch(CartSliderIsClosedAction());
      router.replace("/");
    } else {
      dispatch(
        createNewOrder({
          cart: dataCart,
          totalAmount,
          currentCouponCode: promoCode,
          lang: langPage
        })
      );
      dispatch(currentPageChangeAction("checkout"));
      dispatch(CartSliderIsClosedAction());
      // dispatch(cartAllRemove());
      router.replace("/checkout");
    }
  };

  const applyPromoCode = () => {
    const promoItem = discountData.find((item) => item.code === promoCode);
    if (promoItem) {
      const discountedAmount = totalAmount - promoItem.discount;
      setTotalNewAmount(discountedAmount);
      setIsError(false);
    } else {
      setIsError(true);
      setTotalNewAmount(totalAmount);
      setPromoCode("");
    }
  };

  return (
    <>
      <View style={[styles.container, { width: isMiddle ? 500 : 300 }]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, { color: selectedTheme.text }]}
        >
          {totalNewAmount === 0 || promoCode === ""
            ? havePromo
            : `${yourDiscount} ${currency} ${totalAmount - totalNewAmount} `}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: selectedTheme.text,
                ...Platform.select({
                  web: {
                    outline: "none", // Apply outline style for web platform
                  },
                }),
              },
              {
                color: selectedTheme.text,
                borderColor: isError ? "red" : selectedTheme.borderLine,
                fontSize: 12,
              },
            ]}
            onChangeText={(text) => setPromoCode(text)}
            placeholder={placeHolder}
            value={promoCode}
          />
          <TouchableOpacity
            onPress={applyPromoCode}
            style={[
              styles.button,
              {
                backgroundColor: selectedTheme.subTitle,
                borderColor: isError ? "red" : selectedTheme.borderLine,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.buttonText,
                {
                  color: selectedTheme.backgroundNav,
                },
              ]}
            >
              {apply}
            </Text>
          </TouchableOpacity>
        </View>
        {isError ? (
          <View style={{ maxHeight: 200 }}>
            {isError && (
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[styles.text, { color: "red" }]}
              >
                {info}
              </Text>
            )}
          </View>
        ) : (
          <View style={{ height: 20 }} />
        )}

        <View style={[styles.flexRowContainer, {}]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              textAlign: "right",
              marginRight: 12,
              color: selectedTheme.subTitle,
              fontSize: isMiddle ? 32 : 22,
            }}
          >
            {total}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              textAlign: "right",
              color: selectedTheme.borderBottomLine,
              fontSize: isMiddle ? 36 : 24,
              fontWeight: "600",
            }}
          >
            {currency}
            {totalNewAmount !== 0
              ? totalNewAmount.toFixed(2)
              : totalAmount.toFixed(2)}
          </Text>
        </View>

        <PressableButton
          onPress={checkout}
          title={totalAmount === 0 ? closeCart : checkOutText}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 48,
    overflowX: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    width: 100,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 6,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 8,
  },
  text: {
    marginTop: 16,
    textAlign: "left",
  },
  buttonText: {
    fontWeight: "600",
  },
  separador: {
    flex: 1,
    marginLeft: 16,
    marginRight: 32,
    borderBottomWidth: 1,

    marginTop: 24,
  },

  flexRowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
  },
  checkoutButton: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 48,
    marginTop: 12,
    paddingHorizontal: 6,
  },
});
export default CartPromo;
