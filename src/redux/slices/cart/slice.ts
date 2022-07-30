import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title === action.payload.title &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      if (findItem?.count) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title === action.payload.title &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      if (findItem?.count && findItem.count > 1) {
        findItem.count--;
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((obj) => {
        return !(
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      localStorage.setItem('cart', JSON.stringify(state.items));
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;