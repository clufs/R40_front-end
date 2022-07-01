import { Grid, Card, Typography, Button, Box, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { dateFunction } from '../../../Helpers';
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { MyPie } from '../../../Components/charts/MyPie';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
import { EnvoicePage } from '../OrderPanel/components/Envoice/EnvoicePage';
import { BasicModal_3 } from '../../../Components/modals/Modals';
import { setModalOpen3 } from '../../../features/ui/ui.slice';
import { useEffect } from 'react';
import { startSelectOrder, startUpdateOrderStatus } from '../../../features/orders/orders.slice';

import CheckIcon from '@mui/icons-material/Check';



export const DetailOrder = () => {

  const dispatch = useAppDispatch();
  const { orders, selected } = useAppSelector(state => state.orders);



  let statusButton: boolean = true;
  type statusType = 'Pendiente' | 'En progreso' | 'Listo para Entregar' | 'Entregado';
  let status: statusType = 'Pendiente';


  (selected.status === 'pending') ? (status = 'Pendiente') : (selected.status === 'in-progress' ? status = 'En progreso' : (selected.status === 'finished' ? status = 'Listo para Entregar' : status = 'Entregado' ));
  
  if (status === 'Listo para Entregar' || status === 'Entregado') {
    statusButton = false
  };
  

  const handleFinishedOrder = () => {
    dispatch( startUpdateOrderStatus(selected._id.toString(), 'finished') )
  };

  const handleClickEnvoice = () => {
    EnvoicePage(selected)
    console.log(selected);
  }

  const handleShipedOrder = () => {
    dispatch(startUpdateOrderStatus(selected._id.toString(), 'shiped'))
  }

  useEffect(() => {

    dispatch(startSelectOrder(orders, selected._id))

  }, [orders])


  return (

    <div>
      <BasicModal_3 />
      <h1>Detalles</h1>
      <hr />
      <Grid container spacing={2} p={1}>
        <Grid xs={12} sm={6.5}>

          <Card sx={{ padding: 2, margin: 2 }}>

            <Typography variant='body1' ><strong>Orden: </strong> {selected._id}</Typography>
            <Typography variant='body1' ><strong>Cliente:</strong> {selected.Client}</Typography>
            <hr />
            <Typography variant='body1' ><strong>Total a Cobrar: $</strong> {new Intl.NumberFormat().format(selected.TotalPrice)}</Typography>
            <Typography variant='body1' ><strong>Ganancia Total: $</strong> {new Intl.NumberFormat().format(selected.TotalProfits!)}</Typography>
            <Button disabled={selected.status !== 'shiped'} variant='text' color='warning' sx={{ padding: 0 }} onClick={() => dispatch(setModalOpen3(true))}>
              <Typography variant='body1' ><strong>Saldo: $</strong> {new Intl.NumberFormat().format(selected.dept)}</Typography>
            </Button>

            <hr />

            <Typography variant='body1' ><strong>Fecha de Creacion:</strong> {dateFunction.getFormatDistanceToNow(selected.date)}</Typography>

            <Typography variant='body1' >
              <strong>Estado de Orden:</strong> {status}
            </Typography>

            <Typography variant='body1' >
              <strong>Entregado: </strong>
              <FormControlLabel
                checked={ selected.status === 'shiped'}
                control={<Checkbox />}
                disabled={statusButton}
                onChange={handleShipedOrder}
                label=""
              />
            </Typography>

            <hr />

            <Box display={'flex'} justifyContent='space-between'>

              <Button variant="contained" >
                Imprimir helpers
              </Button>

              <Button variant="contained" onClick={handleFinishedOrder} disabled={!statusButton} startIcon={<CheckIcon />} >
                Finalizar Order
              </Button>

              <Button variant="contained" onClick={handleClickEnvoice}  color='success' startIcon={<PictureAsPdfIcon />}>
                Imprimir Factura
              </Button>

            </Box>

          </Card>

        </Grid>

      </Grid>


    </div >

  )
}
