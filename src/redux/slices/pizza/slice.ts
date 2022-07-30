import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzaItem, PizzaSliceState } from './types';


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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;