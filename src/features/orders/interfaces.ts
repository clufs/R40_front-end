


export interface Order{
  Order: OrderItems[]
  _id: number,

  Client: string,
  TotalPrice: number,
  TotalProfit: number,

  dept: number,
  
  date: number,
  period: string,

  status: StatusProps,
  dateFinish: number,
}

export interface OrderItems{
  cant: number;
  size: number;
  product: string;
  price: number;
  subTotalPrice: number;
  profit: number;

  status: StatusProps;
  _id: string;
}

export type StatusProps = 'pending' | 'in-progress' | 'finished' | 'shiped' | 'canceled';
