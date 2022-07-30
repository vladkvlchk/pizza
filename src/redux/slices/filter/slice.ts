import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  activeCategory: 'Все',
  currentPage: 1,
  currentSort: {
    name: 'популярности (DESC)',
    property: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentSort(state, action: PayloadAction<Sort>) {
      state.currentSort = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (action.payload.activeCategory) {
        state.activeCategory = action.payload.activeCategory;
      }
      if (action.payload.currentPage) {
        state.currentPage = action.payload.currentPage;
      }
      if (action.payload.sort) {
        state.currentSort = action.payload.sort;
      }
    },
  },
});

export const { setSearchValue, setCurrentSort, setActiveCategory, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;