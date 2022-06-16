import { Grid, CardHeader } from '@mui/material';
import { OrderList } from './components/OrderList';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { startUpdateOrderStatus } from '../../../features/orders/orders.slice';
import { useNavigate } from 'react-router-dom';


export const OrderPanel = () => {

  const { selected } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  let statusGlobal: boolean = false;

  selected.Order.map(e => {
    while( e.status === 'pending' || e.status === 'in-progress' ){
      statusGlobal = true
      break
    }
  });

  const handleFinishedOrder = async() => {
    console.log( 'Tarea Terminada!')
    await dispatch( startUpdateOrderStatus(selected._id.toString(), 'finished') )

    navigate(-1);
  };







  return (
    <Grid container spacing={2} >


      <Grid item xs={12} sm={4} >
        <CardHeader title='Pendientes' />
        <OrderList status='pending' />
      </Grid>


      <Grid
        item xs={12} sm={4} >
        <CardHeader title='En progreso..' />
        <OrderList status='in-progress' />

      </Grid>

      <Grid
        item xs={12} sm={4} >
        <CardHeader title='Completadas' />
        <OrderList status='finished' />

      </Grid>

      <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
        <Button onClick={handleFinishedOrder} disabled={statusGlobal} variant="contained" color="success"> Finalizar Pedido </Button>
      </Grid>



    </Grid>
  )
}
