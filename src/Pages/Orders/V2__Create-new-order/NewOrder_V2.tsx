import { Box, Button, Card, CardActionArea, Grid, Paper, Typography } from "@mui/material"
import Under from 'underscore'

import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { SelectProductToOrder } from '../../../features/newOrder/cartOrder.slice';
import { OrderCartList } from './components/OrderCartList';


export const NewOrder_V2 = () => {
  let total: number = 0;
  let profits: number = 0;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products } = useAppSelector(state => state.products);
  const { cart } = useAppSelector( state => state.newOrder );
  
  const categories = products.map(p => p.category);
  const unicos = Under.uniq(categories, false)

  


  const handleClickProductAdd = (prodId: string) => {
    console.log(prodId);
    dispatch(SelectProductToOrder(products, prodId));
    navigate('/ordenes/nueva/prodToAdd')
  };

  const handleClickCheckout = () => {
    navigate('/ordenes/nueva/checkout')
  };

  cart.map( items => ( 
    total += items.price * items.quantity!,
    profits += items.profits * items.quantity!
  ));


  


  return (
    <>
      <Box display='flex' justifyContent={'space-between'}>
        <h2>Crear nueva Orden</h2>
        <h3>Total: ${total}</h3>
        <h3>Ganacias: ${profits}</h3>
        <Button disabled={total === 0 || profits === 0} variant='contained' onClick={handleClickCheckout}>CheckOut</Button>
      </Box>

      <hr />
      <Grid container spacing={1} >
        <Grid item xs={5} marginRight={1}>
          {
            unicos.map(p => (
              <Grid item>
                <Paper elevation={4} sx={{ padding: 1.5, marginTop: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h4'>{p}</Typography>
                  <Grid container spacing={2}>
                    {
                      products.map(prod => (prod.category === p && (
                        <Grid item xs={3}>
                          <CardActionArea onClick={() => handleClickProductAdd(prod.id)}>
                            <Card sx={{ height: 100, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Typography variant="inherit">{prod.name}</Typography>
                            </Card>
                          </CardActionArea>
                        </Grid>
                      )))
                    }
                  </Grid>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
        <Grid xs={6.9} marginTop={2}>
          <OrderCartList />
        </Grid>
      </Grid>
    </>
  )
}
