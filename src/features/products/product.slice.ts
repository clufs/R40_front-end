import { RootState, AppThunk } from '../../Redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSinToken, fetchConToken } from '../../Helpers/fetch';
import Swal from 'sweetalert2';
import { Products } from '../../Pages/Products/Intefaces';
import { ArrayAvalibleCategories } from './avalibles.slice';


interface ProductsProps {
  products: Products[]
}

export const initialState: ProductsProps = {
  products: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    getAllProducts: (state, action: PayloadAction<Products[]>) => {
      return {
        ...state,
        products: action.payload
      }
    },

  }
});


//Funciones asincronas...

export const startGetAllProducts = (): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken('products');
      const { products } = await res.json();


      dispatch(getAllProducts(products));

      
      dispatch(ArrayAvalibleCategories(products));


      return products


    } catch (error) {
      console.log(error)
    }
  }
}


export const startAddNewProduct = (props: Products): AppThunk => {

  // console.log(props.name)
  // console.log(props)


  return async (dispatch) => {
    try {
      const res = await fetchConToken('products', props, 'POST');
      const body = await res.json()
      console.log(body);

      if (body.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Equipo creado! :D',
          timer: 2400,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        dispatch(startGetAllProducts())

        return (true)

      } else {
        Swal.fire({
          icon: 'error',
          title: body.msg + '.',
          // timer: 2400 ,
          position: 'center',
          toast: true,
          showConfirmButton: true,
          timerProgressBar: true,
        });
      }

      // dispatch(getAllProducts())
    } catch (error) {
      console.log(error)
    }


  };
};


//Busqueda del producto por el nombre
const startFindProductByName = (name: string) => {



};

export const startUpdateProductPrice = (props: 'price' | 'raw_material_price', value: string): AppThunk => {
  console.log(props, value);
  return async (dispatch) => {

  }
};




export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
