export interface Products {
  name:string;
  category:string;
  subCategory:string;
  slug?: string;

  size?: number;
  percentage: number ;
  price:number;
  raw_material_price:number;
  profits:number;
  temp?: string,
  time?: string,
  presion?: string,
  id: string
};