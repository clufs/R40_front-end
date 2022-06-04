import { Grid, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClientsChart } from "../../Components/charts/ClientsChart";

export const ClientsPage = () => {

  const navigate = useNavigate();

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
        <Grid xs={12} sm={8} >
          <Card sx={{ maxHeight: '100%', height: '300px', margin: 1}} >
            <ClientsChart />
          </Card>
        </Grid>


        <Grid xs={12} sm={4} >
            <Card sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 1 }}>
              <Button variant='contained' color="success" onClick={navToNewClient} sx={{marginBottom: '20px'}}>Agregar un nuevo cliente</Button>
              <Button variant='contained' color="success" onClick={navToDetails}>Ver detalles</Button>
            </Card>
        </Grid>

      </Grid>
    </>
  )
};


