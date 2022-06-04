import { Grid, Card, CardHeader } from '@mui/material';
import { OrderList } from './components/OrderList';


export const OrderPanel = () => {


  return (
    <Grid container spacing={2}>


      <Grid item xs={12} sm={4} >
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title='Pendientes' />
          <OrderList status='pending'  />
        </Card>
      </Grid>


      <Grid
        item xs={12} sm={4} >
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title='En progreso..' />
          <OrderList status='in-progress' />
        </Card>

      </Grid>

      <Grid
        item xs={12} sm={4} >
        <Card sx={{ height: 'calc(100vh - 100px)' }}>
          <CardHeader title='Completadas' />
          <OrderList status='finished' />
        </Card>

      </Grid>


    </Grid>
  )
}
