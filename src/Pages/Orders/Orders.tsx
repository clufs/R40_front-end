import { Button, Card, CardActionArea, CardActions, CardContent, Grid, LinearProgress, List, Typography } from "@mui/material"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Order } from "../../features/orders/interfaces";
import { startGetAllOrders, startSelectOrder } from "../../features/orders/orders.slice";
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { Invoice } from "./OrderPanel/components/Envoice/EnvoicePage";

export const Orders = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  

  const { orders } = useAppSelector(e => e.orders)


  let ordenesPendientes: Order[] = [];
  (orders !== []) ? ordenesPendientes = orders.filter(e => e.status !== 'finished') : ordenesPendientes = []


  useEffect(() => {
    dispatch(startGetAllOrders())
  }, [])
  



  const handleClickNewOrderPage = () => {
    navigate('/ordenes/nueva')
  };

  const handleClickDetailPage = (id: number) => {
    dispatch(startSelectOrder(orders, id))
    navigate(`/ordenes/${id}`)
  }



  return (
    <>
      <h1>Ordenes</h1>
      <hr />

      <Grid container spacing={2} p={1}>
        <Grid xs={12} sm={7} m={1}>
          <Typography variant="overline">
            Ordenes en curso.
          </Typography>

          <List sx={{ maxHeight: '70vh', overflow: 'scroll' }}>

            {
              (ordenesPendientes.length === 0)
                ?
                <h1>No hay ordenes</h1>
                :
                (
                  (
                    ordenesPendientes.map((e, index) => (
                      <Card key={index} sx={{ maxHeight: '100%', marginTop: 1 }} onClick={() => handleClickDetailPage(e._id)}>
                        <CardActionArea>
                          <CardContent>
                            <Typography sx={{ whiteSpace: "pre-line" }} variant='h5'>
                              Pedido de <strong>{e.Client}</strong>
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
                          >
                            <Typography sx={{ whiteSpace: "inherit" }} variant='h6'>
                              Total: ${new Intl.NumberFormat().format(e.TotalPrice)}
                            </Typography>

                            <Typography sx={{ whiteSpace: "inherit" }} variant='h6'>
                              Ganancia: ${new Intl.NumberFormat().format(e.TotalProfit)}
                            </Typography>
                          </CardActions>
                          <LinearProgress variant="determinate" value={50} />
                        </CardActionArea>
                      </Card>
                    ))
                  )
                )
            }


          </List>
        </Grid>

        <Grid xs={12} sm={4} m={1} >
          <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Button variant='contained' color="success" onClick={handleClickNewOrderPage}>Generar nueva orden</Button>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}
