import { CardHeader, CardContent, Typography, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';


import './Styles.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchConToken } from '../../Helpers/fetch';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';
import { setDateFormat } from '../../Helpers/dateFunctions';

export const Home = () => {

  const [dolar, setDolar] = useState({
    compra: '',
    venta: '',
    fecha: '',
  })

  const { name, uid } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const { orders } = useAppSelector((state) => state.orders)

  let totalPrice: number = 0;
  let totalProfit: number = 0;
  let totalOrders: number = 0;
  let totalOrdersShipped: number = 0;

  let totalPaidOrders: number = 0;
  let totalIngresosPaidOrders: number = 0;
  let shiped_totalOrders: number = 0;
  let order_toShiped: number = 0;

  let totalDebt: number = 0;
  let totalOrdersWhitDebt: number = 0;

  let totalToShip: number = 0;
  let totalProfitToShip: number = 0;



  const anashe = async () => {
    const { data } = await axios.get('https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue')
    setDolar(data);
  }

  useEffect(() => {
    anashe()
  }, [])


  const courrentPeriod = setDateFormat(Date.now());

  // console.log('currentPeriod ===> ', courrentPeriod);



  orders.map(order => {
      // totalPrice += order.TotalPrice
      // totalProfit += order.TotalProfits!
    totalOrders += 1
    if (order.status === 'shiped') {
      totalOrdersShipped += 1
      totalPrice += order.TotalPrice
      totalProfit += order.TotalProfits!
    }

    if (order.status === 'shiped' && order.period === courrentPeriod) {
      totalIngresosPaidOrders += order.TotalPrice - order.dept;
      totalPaidOrders += order.TotalProfits!;
      shiped_totalOrders += 1;
      // console.log(order.period);

    };

    if ((order.status === 'pending' || order.status === 'finished') && order.period === courrentPeriod) {
      totalToShip += order.TotalPrice;
      totalProfitToShip += order.TotalProfits!;
      order_toShiped += 1;
    }
  });









  return (
    <>
      <div className="container">
        <div className="row">
          <Typography variant='h4' >Resumen Total:</Typography>
          <Divider sx={{ marginTop: 2 }} />

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ingresos Totales:</h6>
                <h2 className="text-right"><i className="fas fa-money-bill-alt"></i><span>$ {new Intl.NumberFormat().format(totalPrice)}</span></h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ganancias Totales:</h6>
                <h2 className="text-right"><i className="fa-solid fa-handshake"></i><span>$ {new Intl.NumberFormat().format(totalProfit)}</span></h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ordenes :</h6>
                <h2 className="text-right"><i className="bi bi-archive"></i><span>{totalOrders}</span></h2>
              </div>
            </div>
          </div>

        </div>
        <hr />
        <Typography variant='h4' >Resumen del mes.</Typography>
        <Divider sx={{ marginTop: 2 }} />

        <div className='row'>
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ingresos Totales:</h6>
                <h2 className="text-right"><i className="fas fa-money-bill-alt"></i><span>$ {new Intl.NumberFormat().format(totalIngresosPaidOrders)}</span></h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ganancias Totales:</h6>
                <h2 className="text-right"><i className="fa-solid fa-handshake"></i><span>$ {new Intl.NumberFormat().format(totalPaidOrders)}</span></h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ordenes Recibidas:</h6>
                <h2 className="text-right"><i className="bi bi-archive"></i><span>{totalOrders}</span></h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-pink order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ordenes Entregadas:</h6>
                <h2 className="text-right"><i className="bi bi-archive"></i><span> {shiped_totalOrders} </span></h2>
              </div>
            </div>
          </div>


        </div>
        <hr />

        <Typography variant='h4' >Ordenes Pendientes ({courrentPeriod}) : </Typography>
        <Divider sx={{ marginTop: 2 }} />

        <div className='row'>
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ingreso Total (a cobrar):</h6>
                <h2 className="text-right">
                  <i className="fas fa-money-bill-alt"></i>
                  <span>
                    $ {new Intl.NumberFormat().format(totalToShip)}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ganancias Totales (a cobrar):</h6>
                <h2 className="text-right">
                  <i className="fa-solid fa-handshake"></i>
                  <span>
                    $ {new Intl.NumberFormat().format(totalProfitToShip)}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ordenes Pendientes:</h6>
                <h2 className="text-right"><i className="bi bi-archive"></i><span>{order_toShiped}</span></h2>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
