import { useEffect } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Navbar } from "../Components/ui/Navbar";
import { ClientsPage } from "../Pages/Clients/ClientsPage";
import { ClientDetails } from "../Pages/Clients/ClientDetails"

import { Home } from "../Pages/Home/Home";
import { Products } from '../Pages/Products/Products';
import { Orders } from '../Pages/Orders/Orders';
import { Resumen } from '../Pages/Resume/Resumen';
import { useAppDispatch } from '../Redux/hooks';
import { startGetAllProducts } from "../features/products/product.slice";
import { NewProductPage } from "../Pages/Products/NewProductPage";
import { SelectProductPage } from "../Pages/Products/SelectProductPage";
import { SingleProduct } from '../Pages/Products/SingleProduct';
import { NewClient } from "../Pages/Clients/NewClient";
import { DetailOrder } from "../Pages/Orders/DetailOrder/DetailOrder";
import { OrderPanel } from '../Pages/Orders/OrderPanel/OrderPanel';
// import { EnvoicePage } from "../Pages/Orders/OrderPanel/components/Envoice/EnvoicePage";
import { StockPage } from '../Pages/Products/StockPage';

//*testing v2
import { NewOrder_V2 } from '../Pages/Orders/V2__Create-new-order/NewOrder_V2';
// import { NewOrder } from "../Pages/Orders/NewOrder";
import { NewOrder_ProductPage } from '../Pages/Orders/V2__Create-new-order/NewOrder_ProductPage';
import { NewOrder_Page_checkout } from '../Pages/Orders/V2__Create-new-order/NewOrder_Page_checkout';
import { CheckItems_Page } from "../Pages/Orders/itemsToBuy/CheckItems_Page";

export const PrincipalRouter = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startGetAllProducts());
  }, [])



  return (

    <>
      <Navbar />
      <div className="app2">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/productos" element={<Products />} />
          <Route path="/productos/nuevo" element={<NewProductPage />} />
          <Route path="/productos/seleccionar" element={<SelectProductPage />} />
          <Route path="/productos/producto" element={<SingleProduct />} />
          <Route path="/productos/stock" element={<StockPage />} />

          
          <Route path="/ordenes" element={<Orders />} />
          {/* <Route path="/ordenes/nueva" element={<NewOrder />} /> */}
          <Route path="/ordenes/nueva" element={<NewOrder_V2 />} />
          <Route path='/ordenes/nueva/prodToAdd' element={<NewOrder_ProductPage />} />
          <Route path='/ordenes/nueva/checkout' element={<NewOrder_Page_checkout />} />
          




          <Route path="/ordenes/:id" element={<DetailOrder />} />
          <Route path="/ordenes/:id/stock-check" element={<CheckItems_Page />} />
          <Route path="/ordenes/:id/panel" element={<OrderPanel />} />
          {/* <Route path="/ordenes/:id/invoice" element={<EnvoicePage />} /> */}







          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/clientes/nuevo" element={<NewClient />} />
          <Route path="/clientes/detalles" element={<ClientDetails />} />


          <Route path="/resumen" element={<Resumen />} />

        </Routes>
      </div>
    </>
  );
};
