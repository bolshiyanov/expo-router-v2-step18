import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderTypeInterface } from "@/constants/types/orderType";
import { CartOrder } from "@/constants/types/orderType";
import { Platform } from "react-native";
interface OrdersState {
  orders: OrderTypeInterface[];
}

const initialState: OrdersState = {
  orders: [],
};

const generateRandomOrderNumber = () => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addToOrder: (
      state,
      action: PayloadAction<{ order: OrderTypeInterface }>
    ) => {
      const { order } = action.payload;

      const existingOrder = state.orders.find((o) => o.id === order.id);

      if (existingOrder) {
        existingOrder.cart = order.cart;
        // Update other properties as needed
      } else {
        state.orders.push(order);
      }

      if (Platform.OS === "web") {
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
    createNewOrder: (
      state,
      action: PayloadAction<{
        cart: CartOrder[];
        totalAmount: number;
        currentCouponCode: string;
        lang: string;
      }>
    ) => {
      const { cart, totalAmount, currentCouponCode, lang } = action.payload;

      const currentDate = new Date();

      const formattedDate = currentDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedTime = currentDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedDateTime = `${formattedDate} ${formattedTime}`;
      

      const notEmmptyCartItems = cart.filter((item) => item.number > 0);

      const newOrder: OrderTypeInterface = {
        id: "0",
        cart: notEmmptyCartItems,
        date: formattedDateTime,
        orderNumber: generateRandomOrderNumber().toString(),
        currentCouponCode: currentCouponCode,
        nextCouponCode: "",
        referyId: "",
        totalAmount: totalAmount,
        deliveryId: "0",
        discount: -1,
        shippingPrice: -1,
        totalAmountFromCart: 0,

        deliveryCompanyName: "",
        deliveryTime: 0,

        tax: -1,
        finalTotalAmount: 0,
        lang: lang,
        city: "",
        type: "",
        email: "",
        fristNameBilling: "",
        lastNameBilling: "",
        addressline1Billing: "",
        addressline2Billing: "",
        currentRegionId: "0",
        currentRegion: "",

        provinceBilling: "",
        zipCodeBilling: "",
        phoneBilling: "",
        firstNameShipping: "",
        lastNameShipping: "",
        cityShipping: "",
        addressline1Shipping: "",
        addressline2Shipping: "",
        currentRegionIdShipping: "",
        provinceShipping: "",
        zipCodeShipping: "",
        phoneShipping: "",
      };

      state.orders.push(newOrder);

      if (Platform.OS === "web") {
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },

    checkOut: (
      state,
      action: PayloadAction<{
        id: string;
        deliveryId: string;
        shippingPrice: number;
        tax: number;
        finalTotalAmount: number;
        lang: string;
      }>
    ) => {
      const { id, deliveryId, shippingPrice, tax, finalTotalAmount, lang } =
        action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.deliveryId = deliveryId;
        existingOrder.shippingPrice = shippingPrice;
        existingOrder.tax = tax;
        existingOrder.finalTotalAmount = finalTotalAmount;
        existingOrder.lang = lang;

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    addCustomersBillingAndDelivery: (
      state,
      action: PayloadAction<{
        id: string;
        billingEmail: string;
        firstName: string;
        lastName: string;
        city: string;
        addressLine1: string;
        addressLine2: string;
        province: string;
        zipCode: string;
        phone: string;
      }>
    ) => {
      const {
        id,
        billingEmail,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        province,
        zipCode,
        phone,
      } = action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.email = billingEmail;
        existingOrder.fristNameBilling = firstName;
        existingOrder.lastNameBilling = lastName;
        existingOrder.addressline1Billing = addressLine1;
        existingOrder.addressline2Billing = addressLine2;
        existingOrder.provinceBilling = province;
        existingOrder.city = city;
        existingOrder.zipCodeBilling = zipCode;
        existingOrder.phoneBilling = phone;

        existingOrder.firstNameShipping = firstName;
        existingOrder.lastNameShipping = lastName;
        existingOrder.cityShipping = city;
        existingOrder.addressline1Shipping = addressLine1;
        existingOrder.addressline2Shipping = addressLine2;
        existingOrder.provinceShipping = province;
        existingOrder.zipCodeShipping = zipCode;
        existingOrder.phoneShipping = phone;

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    addCustomersBillingSeparateDelivery: (
      state,
      action: PayloadAction<{
        id: string;
        billingEmail: string;
        firstName: string;
        lastName: string;
        city: string;
        addressLine1: string;
        addressLine2: string;
        province: string;
        zipCode: string;
        phone: string;

        firstDeliveryName: string;
        lastDeliveryName: string;
        cityDelivery: string;
        addressDeliveryLine1: string;
        addressDeliveryLine2: string;
        provinceDelivery: string;
        zipCodeDelivery: string;
        phoneDelivery: string;
      }>
    ) => {
      const {
        id,
        billingEmail,
        firstName,
        lastName,
        city,
        addressLine1,
        addressLine2,
        province,
        zipCode,
        phone,
        cityDelivery,
        firstDeliveryName,
        lastDeliveryName,
        addressDeliveryLine1,
        addressDeliveryLine2,
        provinceDelivery,
        zipCodeDelivery,
        phoneDelivery,
      } = action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.email = billingEmail;
        existingOrder.fristNameBilling = firstName;
        existingOrder.lastNameBilling = lastName;
        existingOrder.city = city;
        existingOrder.addressline1Billing = addressLine1;
        existingOrder.addressline2Billing = addressLine2;
        existingOrder.provinceBilling = province;
        existingOrder.zipCodeBilling = zipCode;
        existingOrder.phoneBilling = phone;

        existingOrder.firstNameShipping = firstDeliveryName;
        existingOrder.lastNameShipping = lastDeliveryName;
        existingOrder.cityShipping = cityDelivery;
        existingOrder.addressline1Shipping = addressDeliveryLine1;
        existingOrder.addressline2Shipping = addressDeliveryLine2;
        existingOrder.provinceShipping = provinceDelivery;
        existingOrder.zipCodeShipping = zipCodeDelivery;
        existingOrder.phoneShipping = phoneDelivery;

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    addRegionToDelivery: (
      state,
      action: PayloadAction<{
        id: string;
        currentRegionId: string;
        currentRegion: string;
        tax: number;
      }>
    ) => {
      const { id, currentRegionId, currentRegion, tax } = action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.currentRegionId = currentRegionId;
        existingOrder.currentRegion = currentRegion;
        existingOrder.tax = tax;
        existingOrder.deliveryId = "0";

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    addDeliveryOptions: (
      state,
      action: PayloadAction<{
        id: string;
        deliveryId: string;
        deliveryCompanyName: string;
        shippingPrice: number;
        deliveryTime: number;
      }>
    ) => {
      const {
        id,
        deliveryId,
        deliveryCompanyName,
        shippingPrice,
        deliveryTime,
      } = action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.deliveryId = deliveryId;
        existingOrder.deliveryCompanyName = deliveryCompanyName;
        existingOrder.shippingPrice = shippingPrice;
        existingOrder.deliveryTime = deliveryTime;

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    addDiscountToOrder: (
      state,
      action: PayloadAction<{
        id: string;
        discount: number;
      }>
    ) => {
      const { id, discount } = action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.discount = discount;

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    addTotalAmountToOrder: (
      state,
      action: PayloadAction<{
        id: string;
        totalAmount: number;
      }>
    ) => {
      const { id, totalAmount } = action.payload;

      // Find the existing order by ID
      const existingOrder = state.orders.find((order) => order.id === id);

      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.finalTotalAmount = totalAmount;

        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    fetchOrder: (state) => {
      let storedOrders;

      if (Platform.OS === "web") {
        storedOrders = localStorage.getItem("orders");
      } else {
        storedOrders = "[]";
      }

      try {
        state.orders = JSON.parse(storedOrders);
      } catch (error) {
        console.error("Error parsing storedOrders:", error);
        state.orders = [];
      }
    },
    saveOrder: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const existingOrder = state.orders.find((order) => order.id === id);
      if (existingOrder) {
        // Update the existing order with the new data
        existingOrder.id = existingOrder.orderNumber;
        if (Platform.OS === "web") {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        }
      }
    },

    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.orders = state.orders.filter((order) => order.id !== id);
      if (Platform.OS === "web") {
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
  },
});

export const {
  addToOrder,
  fetchOrder,
  removeOrder,
  addCustomersBillingAndDelivery,
  addCustomersBillingSeparateDelivery,
  addRegionToDelivery,
  createNewOrder,
  addDeliveryOptions,
  addDiscountToOrder,
  addTotalAmountToOrder,
  checkOut,
  saveOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
