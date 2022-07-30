import { CartItem } from "../redux/slices/cart/types";


export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * (obj.count ? obj.count : 1) + sum;
  }, 0);
};
