import { Box, Paper, Typography, Card, Select, MenuItem, InputLabel, Button, Link } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { OrderCartProps, OrderItems2 } from '../../../features/newOrder/newOrder.slice';
import { useState, useMemo } from 'react';
import { setDateFormat } from '../../../Helpers/dateFunctions';
import { startNewOrder } from '../../../features/orders/orders.slice';
import { useNavigate } from 'react-router-dom';
import { setEmptyCart } from '../../../features/newOrder/cartOrder.slice';



export const NewOrder_Page_checkout = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  let t: number = 0;
  let pr: number = 0;

  const { cart } = useAppSelector(e => e.newOrder);
  const { clients } = useAppSelector(e => e.clients);

  const [values, setValues] = useState<any>()



  const total = useMemo(() => {
    cart.map(p => {
      t += p.price * p.quantity!
    })
    return (t);
  }, []);

  const profit = useMemo(() => {
    cart.map(p => {
      pr += p.profits * p.quantity!
    })
    return pr
  }, [cart]);



  const toSend: OrderCartProps = {
    orders: cart,
    Client: values,
    date: Date.now(),
    status: 'pending',
    period: setDateFormat(Date.now()),
    TotalPrice: total,
    TotalProfits: profit,
    dept: 0
  };
  
  const anashe = async () => {
    dispatch(startNewOrder(toSend));
    navigate('/ordenes');
    dispatch(setEmptyCart());
  };


  return (
    <Box display='flex' sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>

      <Box>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate(-1)}
        >
          <strong>Regresar al Resumen</strong>
        </Link>
        <Card sx={{ padding: 4, alingItems: 'center' }}>
          <Typography variant='h4'>Resumen de orden</Typography>
          <hr />
          <Typography variant='inherit'>Total:</Typography>
          <Typography variant='h4'>${total}</Typography>

          <Typography variant='inherit'>Ganancia Total:</Typography>
          <Typography variant='h4'>${profit}</Typography>

          <Box mt={2}>
            <InputLabel>Cliente</InputLabel>
            <Select
              fullWidth
              label='Clientes'
              value={values}
              onChange={(e) => setValues(e.target.value)}
            >
              {
                clients.map(client => (
                  <MenuItem value={client.name}>{client.name}</MenuItem>
                ))
              }
            </Select>
          </Box>

          <Button variant='outlined' fullWidth sx={{ mt: 4 }} onClick={anashe}> Terminar Orden </Button>

        </Card>
      </Box>

    </Box>
  )
}
