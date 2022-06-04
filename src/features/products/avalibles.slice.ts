import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Products } from '../../Pages/Products/Intefaces';
import { AppThunk } from "../../Redux/store";



interface AvalibleProductsProps {
  category: string[];
  subCategory: string[];
  product: string[];
  theChoiceOne: Products ;
}

export const initialState: AvalibleProductsProps = {
  category: [],
  subCategory: [],
  product: [],
  theChoiceOne: {
    name:'',
    category:'',
    subCategory: '',
    size: 0,
    percentage: 0,
    price: 0,
    raw_material_price: 0,
    profits: 0,
    temp: '',
    time: '',
    presion: '',
  }
}


const avalibleProducts = createSlice({
  name: "avalibleProducts",
  initialState,
  reducers: {
    setArrayCategories(state, action: PayloadAction<string[]>) {
      return {
        ...state,
        category: action.payload,
      }
    },
    setArraySubCategories(state, action: PayloadAction<string[]>) {
      return {
        ...state,
        subCategory: action.payload,
      }
    },
    setArrayProducts(state, action: PayloadAction<string[]>) {
      return {
        ...state,
        product: action.payload,
      }
    },
    setViewProduct(state, action: PayloadAction<Products>) {
      return {
        ...state,
        theChoiceOne: action.payload,
      }
    }
  }
});


export const ArrayAvalibleCategories = (products: Products[]): AppThunk => {
  return async (dispatch) => {
    try {
      let categories: string[] = [];
      products.map((product) => {
        categories.push(product.category)
      })
      const a = new Set(categories);
      console.log(a);
      dispatch(setArrayCategories(Array.from(a)))
    } catch (error) {
      console.log(error)
    }
  }
};

export const ArrayAvalibleSubCategories = (products: Products[], category: string): AppThunk => {
  return async (dispatch) => {
    try {
      const subCategories: string[] = [];
      const arraySubCategories = products.filter((e) => e.category === category);

      arraySubCategories.map((product) => {
        subCategories.push(product.subCategory)
      })

      const a = new Set(subCategories);
      console.log(a);
      dispatch(setArraySubCategories(Array.from(a)));


    } catch (error) {
      console.log(error)

    }
  }
};

export const ArrayAvalibleProducts = (products: Products[], subCategory: string, category: string): AppThunk => {
  return async (dispatch) => {
    try {
      const productsAvalible: string[] = [];
      const arrayProducts = products.filter((e) => e.subCategory === subCategory && e.category === category);

      arrayProducts.map((product) => {
        productsAvalible.push(product.name)
      })

      const a = new Set(productsAvalible);
      console.log(a);
      dispatch(setArrayProducts(Array.from(a)));

    }catch(error){
      console.log(error);
    }
  }
};  

export const getOneProduct = (products:Products[], category: string, subCategory: string, name: string ):AppThunk => {

  console.log('1',category, '2',subCategory, '3',name);
  
  return async (dispatch) => {

    try {
      const oneProduct:Products[] = products.filter( 
        (e) => 
          e.category === category && 
          e.subCategory === subCategory && 
          e.name === name);

      console.log(oneProduct);
      const toSend = oneProduct[0]
      if(oneProduct){
        dispatch(setViewProduct(toSend))
      }

    } catch (error) {
      console.log(error)
    }
  }

}





export const { setArrayCategories, setArraySubCategories, setArrayProducts, setViewProduct } = avalibleProducts.actions;

export default avalibleProducts.reducer;

