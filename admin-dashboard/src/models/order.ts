export interface Order {
  id: string;
  idOrder: string;
  product: string;
  customer: string;
  status: string;
  createdAt: string;
  deadline: string;
  price: number | null;
}
