import { CardHeader, CardContent } from '@mui/material';
import { Grid, Card, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';


import './Styles.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Home = () => {

  const { name, uid } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const { orders } = useAppSelector((state) => state.orders)

  let totalPrice: number = 0;
  let totalProfit: number = 0;
  let totalOrders: number = 0;
  let totalOrdersShipped: number = 0;


  orders.map(order => {
    totalPrice += order.TotalPrice
    totalProfit += order.TotalProfits!
    totalOrders += 1
    if (order.status === 'shiped') {
      totalOrdersShipped += 1
    }
  });






  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ingresos Totales:</h6>
                <h2 className="text-right"><i className="fas fa-money-bill-alt"></i><span>$ {new Intl.NumberFormat().format(totalPrice)}</span></h2>
                <p className="m-b-0">Ingresos del mes:<span className="f-right"> $--- </span></p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ganancias Totales:</h6>
                <h2 className="text-right"><i className="fa-solid fa-handshake"></i><span>$ {new Intl.NumberFormat().format(totalProfit)}</span></h2>
                <p className="m-b-0">Ganancias del mes<span className="f-right">$ --- </span></p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ordenes Recibidas:</h6>
                <h2 className="text-right"><i className="bi bi-archive"></i><span>{totalOrders}</span></h2>
                <p className="m-b-0">Ordenes del mes:<span className="f-right"> --- </span></p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-pink order-card">
              <div className="card-block">
                <h6 className="m-b-20">Ordenes Actuales</h6>
                <h2 className="text-right"><i className="bi bi-archive"></i><span> --- </span></h2>
                <p className="m-b-0">Ordenes Terminadas<span className="f-right"> --- </span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
