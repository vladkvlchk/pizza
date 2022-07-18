import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: 'Все',
  sort: {
    name : 'популярности (DESC)',
    property : 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort (state, action) {
      state.sort = action.payload;
    },
    setCategory (state, action) {
      state.category = action.payload
    },
  },
})

export const { setSort, setCategory } = filterSlice.actions

export default filterSlice.reducer