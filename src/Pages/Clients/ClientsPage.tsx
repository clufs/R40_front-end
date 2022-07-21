import { Grid, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClientsChart } from "../../Components/charts/ClientsChart";
import { useAppSelector } from '../../Redux/hooks';
import { useEffect } from 'react';

export const ClientsPage = () => {

  const navigate = useNavigate();

  const { orders } = useAppSelector(state => state.orders);
  const { clients } = useAppSelector(state => state.clients);

  const clientsArray = clients.map( c => c.name);

  let clientsDetailArray = clients.map(c => ({

    clientName: c.name,
    total: 0,
    totalProfit: 0

  }));


  orders.map( order => {
    clientsDetailArray.map( client => {
      if( order.Client === client.clientName){
        client.total += order.TotalPrice;
        client.totalProfit += order.TotalProfits!
      }
    })
  });

  // console.log(orders);
  // console.log(clients);



  const navToNewClient = () => {
    navigate('/clientes/nuevo')
  };

  const navToDetails = () => {
    navigate('/clientes/detalles')
  }


  return (
    <>
      <h1>Clientes</h1>
      <hr />

      <Grid container spacing={2} p={1}>
        <Grid xs={12} sm={12} >
          <Card sx={{ maxHeight: '100%', height: '300px', margin: 1 }} >
            <ClientsChart clientsArray={clientsArray} clientsDetailArray={clientsDetailArray}/>
          </Card>
        </Grid>


        <Grid xs={12} sm={2} >
          <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 1 }}>
            <Button variant='contained' color="success" onClick={navToNewClient} sx={{ marginBottom: '20px' }}>Agregar un nuevo cliente</Button>
            <Button variant='contained' color="success" onClick={navToDetails}>Ver detalles</Button>
          </Card>
        </Grid>

      </Grid>
    </>
  )
};


