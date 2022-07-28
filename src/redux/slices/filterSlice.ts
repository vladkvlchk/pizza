import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  property: 'rating' | '-rating' | 'title' | '-title' | 'price' | '-price';
};

interface FilterSliceState {
  searchValue: string;
  activeCategory: string;
  currentPage: number;
  currentSort: Sort;
}

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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
      console.log('в редаксе присвоили: ', action.payload);
    },
    setCurrentSort(state, action) {
      state.currentSort = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
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

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterActiveCategory = (state: RootState) => state.filter.activeCategory;
export const selectFilterCurrentSort = (state: RootState) => state.filter.currentSort;

export const { setSearchValue, setCurrentSort, setActiveCategory, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
