import { createSlice } from "@reduxjs/toolkit";
import { number } from "yup";
import { StatusProps } from "../orders/interfaces";
import { AppThunk } from "../../Redux/store";

export interface OrderItems2 {
  _id: string;
  name: string;
  price: number;
  profits: number;
  color: string;
  variant: string;
  size: string;
  subTotal: number;
  profit?: number;
  quantity: number;
}

export interface OrderCartProps {
  orders: OrderItems2[];
  date: number;
  status: StatusProps;
  Client: string;
  period: string;

  TotalPrice: number;
  TotalProfits: number;
  dept: number;
}

const initialState: OrderCartProps = {
  orders: [],
  date: 0,
  status: "pending",
  Client: "",
  period: "",

  TotalPrice: 0,
  TotalProfits: 0,
  dept: 0,
};

export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {},
});

export const startAddNewOrder = (order: OrderItems2[]): AppThunk => {
  return async (dispatch) => {
    
  };
};

export const {} = createOrderSlice.actions;
export default createOrderSlice.reducer;
