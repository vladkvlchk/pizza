import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title === action.payload.title &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.title === action.payload.title &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      if (findItem && findItem.count > 1) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItem(state, action) {
      state.items = state.items.filter((obj) => {
        return !(
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        );
      });

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

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
      (obj) => obj.id === id && obj.type === activeType && obj.size === activeSize,
    );
};

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
