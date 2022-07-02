import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../Pages/Products/Intefaces";
import { AppThunk } from "../../Redux/store";
import { StatusProps } from "../orders/interfaces";
import { OrderItems2 } from "./newOrder.slice";


interface Props {
  selected: Products | undefined;
  cart: OrderItems2[] | [];
};

const initialState: Props = {
  selected: undefined,
  cart: [],
};

export const cartOrderSlice = createSlice({
  name: "create_Order_Cart",
  initialState,
  reducers: {
    selectedProdToCart(state, action: PayloadAction<Products | undefined>) {
      return {
        ...state,
        selected: action.payload,
      };
    },

    addProductsToCart(state, action: PayloadAction<any>) {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },

    deleteProductToCart( state, action: PayloadAction<any>){
      return{
        ...state,
        cart: action.payload
      }
    },

    setEmptyCart(state){
      return{
        ...state,
        cart: []
      }
    }
  },
});

export const SelectProductToOrder = (
  products: Products[],
  productId: string
): AppThunk => {
  return async (dispatch) => {
    const prodSel = products!.find((prod) => prod.id === productId);
    dispatch(selectedProdToCart(prodSel));
    console.log(prodSel);
  };
};

export const AddToCart = (productToAdd: any, cart: OrderItems2[]): AppThunk => {
  return async (dispatch) => {
    const productsInCart = cart.some((p) => p._id === productToAdd._id);
    if (!productsInCart) return dispatch(addProductsToCart(productToAdd));

    const productInCartButDifferentSize = cart.some((p) =>
        p._id === productToAdd._id &&
        p.size === productToAdd.size &&
        p.variant === productToAdd.variant &&
        p.color === productToAdd.color
    );
    if (!productInCartButDifferentSize) return dispatch(addProductsToCart(productToAdd));

  };
};


export const deleteToCart = (index: number, cart: OrderItems2[]): AppThunk => {
  console.log('1',cart);
  return async (dispatch) => {
    const cart1 = [...cart];
    console.log(cart1);
    // const newCart = cart1.splice( index, 1 );
    // console.log('newCart',newCart);
    // dispatch(updateCart(newCart));
  }
}

export const { selectedProdToCart, addProductsToCart, deleteProductToCart, setEmptyCart } =
  cartOrderSlice.actions;
export default cartOrderSlice.reducer;
