import { Grid, Card, Typography, Button, Box } from '@mui/material';
import { dateFunction } from '../../../Helpers';
import { useAppSelector } from '../../../Redux/hooks';
import { MyPie } from '../../../Components/charts/MyPie';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
import { Invoice } from '../OrderPanel/components/Envoice/EnvoicePage';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';

export const DetailOrder = () => {

  const { selected } = useAppSelector(state => state.orders);
  const navigate = useNavigate()

  let status;
  (selected.status === 'pending') ? (status = 'Pendiente') : ((selected.status === 'in-progress') ? (status = 'En progreso') : (status = 'Terminado'));

  const statusOf = {
    pending: 0,
    inProgress: 0,
    finished: 0,
  };
  selected.Order.map(e => {
    e.status === 'pending' ? statusOf.pending += 1 : (e.status === 'in-progress' ? statusOf.inProgress += 1 : statusOf.finished += 1);
  });

  const handleClickPanelPage = () => {
    navigate(`/ordenes/${selected._id}/panel`)
  }

  const handleClickEnvoice = () => {
    // ReactPDF.render(<Invoice />, `${__dirname}/example.pdf`);
    navigate(`/ordenes/${selected._id}/invoce`)
  }


  return (
    <div>
      <h1>Detalles</h1>
      <hr />
      <Grid container spacing={2} p={1}>
        <Grid xs={12} sm={6}>

          <Card sx={{ padding: 2, margin: 2 }}>

            <Typography variant='body1' ><strong>Orden: </strong> {selected._id}</Typography>
            <Typography variant='body1' ><strong>Cliente:</strong> {selected.Client}</Typography>
            <hr />
            <Typography variant='body1' ><strong>Total a Cobrar: $</strong> {new Intl.NumberFormat().format(selected.TotalPrice)}</Typography>
            <Typography variant='body1' ><strong>Ganancia Total: $</strong> {new Intl.NumberFormat().format(selected.TotalProfit)}</Typography>
            <hr />
            <Typography variant='body1' ><strong>Fecha de Creacion:</strong> {dateFunction.getFormatDistanceToNow(selected.date)}</Typography>
            <Typography variant='body1' ><strong>Estado de Orden: </strong> {status}</Typography>
            <hr />

            <Box display={'flex'} justifyContent='space-between'>

              <Button variant="contained" onClick={handleClickEnvoice} color='success' startIcon={<PictureAsPdfIcon />}>
                Imprimir Factura
              </Button>

              <Button variant="contained" color='warning' startIcon={<PictureAsPdfIcon />}>
                Cancelar Orden
              </Button>

            </Box>

          </Card>

        </Grid>

        <Grid xs={12} sm={6}>

          <Box display={'flex'} justifyContent={'space-between'} padding={2}>
            <Typography variant='h5'>Estado Actual</Typography>
            <Button variant='contained' color='success' onClick={handleClickPanelPage}>Ir al Panel</Button>
          </Box>
          <MyPie title='Estado de la orden' values={statusOf} />

        </Grid>

      </Grid>


    </div>

  )
}
