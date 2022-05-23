import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { startChecking } from '../features/auth/auth.slice';
import { Login } from '../Pages/Login/Login';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { PublicRoutesProps } from './Interfaces';
import { PrincipalRouter } from './PrincipalRouter';

import './AppRouter.css'



export const AppRouter = () => {

  const dispatch = useAppDispatch();
  const {name, uid} = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [])
  



  return (
    <div className="app1">

      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute isAuth={uid}>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute isAuth={uid}>
                  <PrincipalRouter />
              </PrivateRoute>
            }
          />
        </Routes>


      </BrowserRouter>

    </div>
  )
}


export const PublicRoute = ({ isAuth, children }: PublicRoutesProps) => {
  return isAuth ? <Navigate to="/" /> : children;
};

export const PrivateRoute = ({ isAuth, children }: PublicRoutesProps) => {
  return isAuth ? children : <Navigate to="/login" />;
};
