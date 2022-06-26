export interface Products {
  name:string;
  category:string;


  subCategory:string;
  size?: number;

  sizes?: number[],
  variant?: string[],

  slug?: string;




  percentage: number ;
  price:number;
  raw_material_price:number;
  profits:number;
  temp?: string,
  time?: string,
  presion?: string,
  id: string
};

