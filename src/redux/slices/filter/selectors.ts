import { RootState } from "../../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterActiveCategory = (state: RootState) => state.filter.activeCategory;
export const selectFilterCurrentSort = (state: RootState) => state.filter.currentSort;