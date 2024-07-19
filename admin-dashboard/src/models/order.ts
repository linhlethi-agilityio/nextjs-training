export interface Order {
  id: string;
  idOrder: string;
  product: string;
  customer: string;
  status: string;
  createdAt: string;
  deadline: string;
  productImage: string;
  price: number | null;
}
