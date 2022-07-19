


export interface Order{
  orders?: OrderItems[];
  Order: OrderItems[]
  _id: number,

  Client: string,
  TotalPrice: number,
  TotalProfit?: number,
  TotalProfits?: number,

  dept: number,
  
  date: number,
  period: string,

  status: StatusProps,
  dateFinish: number,
}

export interface OrderItems{
  quantity?: number;
  name?: string;
  variant?: string;
  color?: string;
  cant: number;
  size: number;
  product: string;
  price: number;
  subTotalPrice: number;
  profit: number;
  statusOfStock?: string;

  status: StatusProps;
  slug?: string;
  _id: string;
}

export type StatusProps = 'pending' | 'in-progress' | 'finished' | 'shiped' | 'canceled';
