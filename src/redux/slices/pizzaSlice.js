import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
  async ({ category, sortBy, order, currentPage, searchValue }) => {
    const { data } = await axios.get(
      `https://62cc94cda080052930ada9ff.mockapi.io/all?page=${currentPage}&limit=${8}${category}&search=${searchValue}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  }

)

const initialState = {
  items: ['', '', '', '', '', '', '', ''],
  status: 'loading' // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
