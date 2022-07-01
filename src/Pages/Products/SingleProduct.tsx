import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setModalOpen1, setModalOpen2 } from "../../features/ui/ui.slice";
import { BasicModal, BasicModal_2 } from '../../Components/modals/Modals';
import { ConnectingAirportsOutlined } from "@mui/icons-material";



export const SingleProduct = () => {

  const dispatch = useAppDispatch()
  const { name, price, profits, raw_material_price, percentage, colors, sizes, variants } = useAppSelector(state => state.avalible.theChoiceOne)

  const openModal1 = () => {
    dispatch(setModalOpen1(true));
  };

  const openModal2 = () => {
    dispatch(setModalOpen2(true));
  };

  return (
    <>
      <BasicModal />
      <BasicModal_2 />


      <h1>{name}</h1>
      <hr />

      <Grid container spacing={2} paddingTop={2}>

        <Grid item xs={12} sm={4}>
          <Paper elevation={4} sx={{ padding: 1.5 }}>
            <Typography variant="overline">
              <IconButton onClick={openModal1}>
                <EditIcon />
              </IconButton>Precio de venta:
            </Typography>
            <Typography variant="h6" sx={{ paddingLeft: 5 }}> $ {price} </Typography>


            <Typography variant="overline">
              <IconButton onClick={openModal2}>
                <EditIcon />
              </IconButton>Precio de fabricacion:
            </Typography>

            <Typography variant="h6" sx={{ paddingLeft: 5 }}>$ {raw_material_price} </Typography>

            <hr />

            <Typography variant="overline" sx={{ paddingLeft: 5 }}>Ganancia:</Typography>
            <Typography variant="h6" sx={{ paddingLeft: 5 }}>$ {profits} </Typography>
            <Typography variant="overline" sx={{ paddingLeft: 5 }}>Porcentaje:</Typography>
            <Typography variant="h6" sx={{ paddingLeft: 5 }}>% {percentage.toFixed(2)} </Typography>
          </Paper>

        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={4} sx={{ padding: 1.5, display: 'flex', flexDirection: 'column' }}>

            <Typography variant="overline" sx={{ display: 'flex', justifyContent: 'center' }}>Colores Disponibles:</Typography>
            {
              colors!.length > 0 ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {
                      colors!.map((color, i) => (
                        <Chip sx={{ mt: 1, ml: 1 }} key={i} label={color} />
                      ))
                    }
                  </Box>
                </>
              ) :
                (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip label={'no existen colores definidos'} />
                  </Box>
                )

            }

          </Paper>

          <Paper elevation={4} sx={{ padding: 1.5, marginTop: 1, display: 'flex', flexDirection: 'column' }}>

            <Typography  variant="overline" sx={{ display: 'flex', justifyContent: 'center' }}>Talles Disponibles:</Typography>
            {
              sizes!.length ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {
                      sizes!.map((size, i) => (
                        <Chip sx={{ mt: 1, ml: 1 }} key={i} label={size} />
                      ))
                    }
                  </Box>
                </>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Chip label={'no exiten talles definidos'} />
                </Box>
              )
            }

          </Paper>

          <Paper elevation={4} sx={{ padding: 1.5, marginTop: 1, display: 'flex', flexDirection: 'column' }}>

            <Typography variant="overline" sx={{ display: 'flex', justifyContent: 'center' }}>Variantes:</Typography>
            {
              (variants!.length > 0) ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {
                      variants!.map((variant, i) => (
                        <Chip sx={{ mt: 1, ml: 1 }} key={i} label={variant} />
                      ))
                    }
                  </Box>
                </>
              ) :
                (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip label={'no existe variantes definidas'} />
                  </Box>
                )
            }

          </Paper>


        </Grid>
      </Grid>
    </>
  )
}
