import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../Redux/store";
import { Order, StatusProps, OrderItems } from './interfaces';
import { fetchConToken } from '../../Helpers/fetch';
import { OrderProps1 } from "../../Pages/Orders/NewOrder";
import Swal from "sweetalert2";


interface OrderProps {
  orders: Order[]
  selected: Order
}

interface OrdersState {
  id: string;
  status: StatusProps;
}

export const initialState: OrderProps = {
  orders: [],
  selected: {
    Order: [],
    _id: 0,
    Client: '',
    TotalPrice: 0,
    TotalProfit: 0,
    date: 0,
    status: 'pending',
    dateFinish: 0,
  },
};


export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getAllOrders: (state, action: PayloadAction<Order[]>) => {
      return {
        ...state,
        orders: action.payload
      }
    },

    selectOrder: (state, action: PayloadAction<Order>) => {
      return {
        ...state,
        selected: action.payload
      }
    },


    refreshOrdersStatus: (state, action: PayloadAction<Order>) => {

      return {
        ...state,
        selected: action.payload
      }
    }
  }
});

export const startNewOrder = (order: OrderProps1): AppThunk => {


  return async (dispatch) => {
    try {
      const res = await fetchConToken('orders/new', order, 'POST');
      const body = await res.json();

      console.log(body);
      if (body.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Orden Creada con exito',
          timer: 2400,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        dispatch(startGetAllOrders());
      } else {
        console.log('mierda');
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

    } catch (error) {
      console.log(error)
    }

  }

};

export const startUpdateOrderItemStatus = (idCol: string, id: string, status: StatusProps): AppThunk => {
  return async (dispatch) => {
    try {

      const res = await fetchConToken('orders/update-status-order', { idCol, id, status }, 'POST');
      const body = await res.json();


      if (body.ok) {
        dispatch(refreshOrdersStatus(body.order));
      }


    } catch (error) {
      console.log(error)
    }
  }
}

export const startGetAllOrders = (): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken('orders');
      const { orders } = await res.json()

      if (orders && orders.length > 0) {
        await dispatch(getAllOrders(orders))
      } else {
        console.log(' no hay ordenes ');
      }

    } catch (error) {
      console.log(error)
    }
  }
};

export const startSelectOrder = (order: Order[], id: number): AppThunk => {
  return async (dispatch) => {

    const orderSelected = order.find(item => item._id === id) || initialState.selected;
    dispatch(selectOrder(orderSelected));

  }
};





export const { getAllOrders, selectOrder, refreshOrdersStatus } = orderSlice.actions;

export default orderSlice.reducer;