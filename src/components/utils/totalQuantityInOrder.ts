import { useAppSelector } from "@/components/utils/hooks/redux";


const calculateTotalQuantity = (orders) => {

    return orders.reduce((total, order) => {
      return (
        total +
        order.cart.reduce((cartTotal, cartItem) => {
          return cartTotal + cartItem.number;
        }, 0)
      );
    }, 0);
  };
  
  
  export const totalQuantityInOrder = () => {
    const orders = useAppSelector((state) => state.ordersSlice.orders);
  
    return calculateTotalQuantity(orders);
  };