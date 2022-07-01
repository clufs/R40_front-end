export interface Products {
  name:string;
  category:string;
  subCategory:string;
  
  sizes?: string[];
  variants?: string[];
  colors?: string[];
  
  slug?: string;
  
  size?: number;
  color?: string;
  variant?: string;
  quantity?: number;




  percentage: number ;
  price:number;
  raw_material_price:number;
  profits:number;
  temp?: string,
  time?: string,
  presion?: string,
  id: string

  _id?: string;
};

