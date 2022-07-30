export type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
};

export interface PizzaSliceState {
  items: PizzaItem[];
  status: 'loading' | 'success' | 'error';
}
