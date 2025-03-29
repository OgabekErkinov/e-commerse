export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  inDiscount: string;
  image: string;
  solded: number;
  quantity?: number;
}
