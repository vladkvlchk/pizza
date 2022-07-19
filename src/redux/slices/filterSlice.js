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
      state.category = action.payload
    },
    setCurrentPage (state, action) {
      state.currentPage = action.payload
    },
  },
})

export const { setCurrentSort, setActiveCategory, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer