import { AppThunk } from '../../Redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchConToken } from '../../Helpers/fetch';
import Swal from 'sweetalert2';
import { Products } from '../../Pages/Products/Intefaces';
import { ArrayAvalibleCategories, setViewProduct } from './avalibles.slice';



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
  },
});



export const startGetAllProducts = (): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken('products');
      const { products } = await res.json();

      console.log(products);

      if( products !== undefined) {

        dispatch(getAllProducts(products));
    
        dispatch(ArrayAvalibleCategories(products));
  
        return products
      }
      if(products === undefined) {

        dispatch(getAllProducts([]));
  
        dispatch(ArrayAvalibleCategories([]));
  
        return products
      }




    } catch (error) {
      console.log(error)
    }
  }
};


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


export const startUpdatePrice = (id: string, price: number, profits:number, percentage:string): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken(`products/${id}`, { price, profits, percentage }, 'PUT');
      const body = await res.json()
      console.log(body.productUpdate);

      if (body.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Precio actualizado! :D',
          timer: 2400,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        dispatch(startGetAllProducts())
        dispatch(setViewProduct(body.productUpdate))

      } else {
        Swal.fire({
          icon: 'error',
          title: body.msg + '.',
          position: 'center',
          toast: true,
          showConfirmButton: true,
          timerProgressBar: true,
        });
      }

    } catch (error) {
      console.log(error)
    }
  }
};

export const startUpdateRawMaterialPrice = (id: string, raw_material_price: number, profits:number, percentage:string): AppThunk => {

  return async (dispatch) => {
    try {

      const res =  await fetchConToken(`products/${id}`, { raw_material_price, profits, percentage }, 'PUT');
      const body = await res.json();

      console.log(body.productUpdate);

      if (body.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Precio actualizado! :D',
          timer: 2400,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        dispatch(startGetAllProducts())
        dispatch(setViewProduct(body.productUpdate))

      } else {
        Swal.fire({
          icon: 'error',
          title: body.msg + '.',
          position: 'center',
          toast: true,
          showConfirmButton: true,
          timerProgressBar: true,
        });
      }

    } catch (error) {
      console.log(error)
    }
  }
};






export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
