import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Navbar } from "../Components/ui/Navbar";
import { ClientsPage } from "../Pages/Clients/ClientsPage";

import { Home } from "../Pages/Home/Home";
import { Products } from '../Pages/Products/Products';
import { Orders } from '../Pages/Orders/Orders';
import { Resumen } from '../Pages/Resume/Resumen';

export const PrincipalRouter = () => {

  // const {uid} = useSelector( state => state.auth );
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(startGetAllDevice(uid));
  // }, [])



  return (
    <>
      <Navbar />
      <div className="app2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/ordenes" element={<Orders />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/resumen" element={<Resumen />} />

        </Routes>
      </div>
    </>
  );
};
