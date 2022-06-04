


export interface Order{
  Order: OrderItems[]
  _id: number,

  Client: string,
  TotalPrice: number,
  TotalProfit: number,
  
  date: number,
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

export type StatusProps = 'pending' | 'in-progress' | 'finished';
