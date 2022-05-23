import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../Redux/store';
import { fetchSinToken, fetchConToken } from '../../Helpers/fetch';
import Swal from 'sweetalert2';


interface AuthProps {
  name: string;
  uid: string;
  checking: boolean;
};

export const initialState:AuthProps = {
  name: '',
  uid: '',
  checking: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    startLogin: (state) => {
      return{
        ...state,
        name: '',
        uid: '',
      }
    },

    login: (state, action:PayloadAction<AuthProps>) => {
      return{
        ...state,
        name: action.payload.name,
        uid: action.payload.uid,
        checking: false,
      }
    },

    authCheckinFinish: (state)=> {
      return{
        ...state,
        checking: false
      }
    },

    logout: (state) => {
      return{
        ...state,
        name: '',
        uid: '',
        checking: false,
      }
    },
  }
});


export const startAuth = (email:string, password:string): AppThunk => {

  return async (dispatch) => {
    try {
      const res = await fetchSinToken('auth', {email, password}, 'POST');
      const body = await res.json()

      if(body.ok){
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime().toString() );  
        dispatch(login(body));
      }else{
        Swal.fire({
          icon: 'error',
          title: body.msg,
          toast: true,
          timerProgressBar: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
};

export const startChecking = (): AppThunk => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();

    if(body.ok){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(login(body));
    }else{
      dispatch(authCheckinFinish())
    }
  }
};

export const startLogout = (): AppThunk => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    dispatch(logout());
  }
};





export const { login, startLogin, authCheckinFinish, logout } = authSlice.actions;

// export const user = (state: RootState) => state.auth.name;

export default authSlice.reducer;




