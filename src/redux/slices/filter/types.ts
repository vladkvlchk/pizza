export type Sort = {
  name: string;
  property: string;
};

export interface FilterSliceState {
  searchValue: string;
  activeCategory: string;
  currentPage: number;
  currentSort: Sort;

  sort?: Sort;
}
