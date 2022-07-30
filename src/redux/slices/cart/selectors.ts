import { RootState } from "../../store";
import { CartItem } from "./types";

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartCountOfSingleItems = ({
  id,
  activeType,
  activeSize,
}: {
  id: string;
  activeType: string;
  activeSize: number;
}) => {
  return (state: RootState) =>
    state.cart.items.find(
      (obj : CartItem) => obj.id === id && obj.type === activeType && obj.size === activeSize,
    );
};