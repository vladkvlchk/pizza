import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategory: 'Все',
  currentPage: 1,
  currentSort: {
    name : 'популярности (DESC)',
    property : 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentSort (state, action) {
      state.currentSort = action.payload;
    },
    setActiveCategory (state, action) {
      state.activeCategory = action.payload
    },
    setCurrentPage (state, action) {
      state.currentPage = action.payload
    },
    setFilters (state, action) {
      state.activeCategory = action.payload.activeCategory;
      state.currentPage = action.payload.currentPage;
      state.currentSort = action.payload.sort;
    }
  },
})

export const { setCurrentSort, setActiveCategory, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer