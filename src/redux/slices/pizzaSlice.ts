import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({
    category,
    sortBy,
    order,
    currentPage,
    searchValue,
  }: {
    category: string;
    sortBy: string;
    order: string;
    currentPage: number;
    searchValue: string;
  }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://62cc94cda080052930ada9ff.mockapi.io/all?page=${currentPage}&limit=${8}${category}&search=${searchValue}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
};

interface PizzaSliceState {
  items: PizzaItem[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(fetchPizzas.pending, (state: any) => {
        state.status = 'loading';
        state.items = [];
      }),
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      }),
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      })
    );
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
