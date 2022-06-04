import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface selectProps {
  category: string;
  subcategory: string;
  product: string;
  countStep: number;

}


const initialState:selectProps = {

  category: '',
  subcategory: '',
  product: '',
  countStep: 0,

}

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {

    setCategory: (state, action) => {
      return{
        ...state,
        category: action.payload
      }
    },

    setSubcategory: (state, action) => {
      return{
        ...state,
        subcategory: action.payload
      }
    },

    setProduct: (state, action) => {
      return{
        ...state,
        product: action.payload
      }
    },

    setCountStep: (state, action) => {
      return{
        ...state,
        countStep: action.payload
      }
    },

    setEmptySelect: (state) => {
      return{
        ...state,
        category: '',
        subcategory: '',
        product: '',
        countStep: 0,
      }
    }
  }
});


export const {setCategory, setSubcategory, setProduct, setCountStep, setEmptySelect} = selectSlice.actions;
export default selectSlice.reducer
