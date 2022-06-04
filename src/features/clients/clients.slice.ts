import { fetchConToken } from "../../Helpers/fetch";
import { AppThunk } from "../../Redux/store";
import Swal from 'sweetalert2';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clients } from "./interfaces";

interface ClientsProps {
  clients: Clients[]
}

export const initialState: ClientsProps = {
  clients: []
};


export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    getAllClientes: (state, action: PayloadAction<Clients[]>) => {
      return {
        ...state,
        clients: action.payload
      }
    }
  }
});


export const AddNewClient = (client: Clients): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken('clients/new', client, 'POST');
      const body = await res.json();


      if (body.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente Agregado :D',
          timer: 2400,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        dispatch(startGetAllClients())

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

    } catch (error) {
      console.log(error)
    }
  }
};

export const startGetAllClients = (): AppThunk => {

  return async (dispatch) => {
    const resp = await fetchConToken('clients');
    const body = await resp.json();

    if (body.ok) {
      dispatch(getAllClientes(body.clients))
    } else {
      console.log('la cagamos bro')
    }
  }
};









export const { getAllClientes } = clientSlice.actions;

export default clientSlice.reducer;