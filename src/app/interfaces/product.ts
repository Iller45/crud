export interface Product {
  id: number;
  name: string;
  img: string;
  cost: number;
  description: string;
}
export interface ProductAction {
  payload: Product;
  type: string;
}
