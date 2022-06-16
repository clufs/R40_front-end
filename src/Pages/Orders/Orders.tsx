import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, LinearProgress, List, Tab, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Order } from "../../features/orders/interfaces";
import { startGetAllOrders, startSelectOrder } from "../../features/orders/orders.slice";
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { setDateFormat } from '../../Helpers/dateFunctions';


export const Orders = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const courrentPeriod = setDateFormat(Date.now());

  
  
  const { orders } = useAppSelector(e => e.orders)
  console.log(courrentPeriod);
  console.log(orders.map( e => e.period));

  let ordenesPendientes: Order[] = [];
  let ordenesTerminadas: Order[] = [];
  let ordenesEntregadas: Order[] = [];

  

  (orders !== []) ? ordenesPendientes = orders.filter(e => ((e.period === courrentPeriod) && (e.status !== 'finished' && e.status !== 'shiped')) ) : ordenesPendientes = [];
  (orders !== []) ? ordenesTerminadas = orders.filter(e => ((e.period === courrentPeriod) && (e.status === 'finished')) ) : ordenesTerminadas = [];
  (orders !== []) ? ordenesEntregadas = orders.filter(e => ((e.period === courrentPeriod) && (e.status === 'shiped')) ) : ordenesEntregadas = [];

  console.log( ordenesEntregadas );

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
  //-----------------------------

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



  return (
    <>
      <h1>Ordenes</h1>
      <hr />

      <Grid container spacing={2} p={1}>
        <Grid xs={12} sm={7} m={1}>

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Ordenes en curso" value="1" />
                  <Tab label="Ordenes Listas para Entregar" value="2" />
                  <Tab label="Ordenes Entregadas" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <List sx={{ maxHeight: '65vh', overflow: 'scroll' }}>
                  {
                    (ordenesPendientes.length === 0)
                      ?
                      <h1>No hay ordenes Pendientes</h1>
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
                                <LinearProgress variant="determinate" value={100} />
                              </CardActionArea>
                            </Card>
                          ))
                        )
                      )
                  }


                </List>
              </TabPanel>

              <TabPanel value="2">
                <List sx={{ maxHeight: '65vh', overflow: 'scroll' }}>
                  {
                    (ordenesTerminadas.length === 0)
                      ?
                      <h1>No hay ordenes Pendientes</h1>
                      :
                      (
                        (
                          ordenesTerminadas.map((e, index) => (
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
                                <LinearProgress variant="determinate" value={100} />
                              </CardActionArea>
                            </Card>
                          ))
                        )
                      )
                  }
                </List>

              </TabPanel>

              <TabPanel value="3">
                <List sx={{ maxHeight: '65vh', overflow: 'scroll' }}>
                  {
                    (ordenesTerminadas.length !== 0)
                      ?
                      <h1>No hay ordenes Entregadas</h1>
                      :
                      (
                        (
                          ordenesEntregadas.map((e, index) => (
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

                                  {
                                    (e.dept !== 0) 
                                    ? 
                                    (
                                      <Typography sx={{ whiteSpace: "inherit" }} variant='h6' color={'#dd2c00'}>
                                        Saldo: ${new Intl.NumberFormat().format(e.dept)}
                                      </Typography>
                                    )
                                    :
                                    (
                                      <Typography variant="h6" color='#00c853'> Sin deudas </Typography>
                                    )
                                  }


                                </CardActions>
                                <LinearProgress variant="determinate" value={100} />
                              </CardActionArea>
                            </Card>
                          ))
                        )
                      )
                  }
                </List>

              </TabPanel>

            </TabContext>
          </Box>

        </Grid>

        <Grid xs={12} sm={4} m={1} >
          <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Button variant='contained' color="success" onClick={handleClickNewOrderPage}>Generar nueva orden</Button>
            <Button variant='contained' color="info" sx={{ marginTop: 1 }}>Ver todas las Ordenes</Button>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}
