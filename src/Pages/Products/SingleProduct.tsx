import { Grid, Paper, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setModalOpen1, setModalOpen2 } from "../../features/ui/ui.slice";
import { BasicModal, BasicModal_2 } from '../../Components/modals/Modals';




export const SingleProduct = () => {

  const dispatch = useAppDispatch()
  const { name, price, profits, raw_material_price, percentage } = useAppSelector(state => state.avalible.theChoiceOne)

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


      <h3>{name}</h3>

      <Grid container spacing={2} paddingTop={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <Typography variant="h5">
              <IconButton onClick={openModal1}>
                <EditIcon />
              </IconButton>Precio de venta:
            </Typography>
            <Typography variant="h4" sx={{ paddingLeft: 5 }}> $ {price} </Typography>

            <hr />

            <Typography variant="h5">
              <IconButton onClick={openModal2}>
                <EditIcon />
              </IconButton>Precio de fabricacion:
            </Typography>

            <Typography variant="h4" sx={{ paddingLeft: 5 }}>$ {raw_material_price} </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper>
            {/* <ChartSingleProduct /> */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={4} sx={{ padding: 2, }}>
            <Typography variant="h5" sx={{ paddingLeft: 5 }}>Ganancia:</Typography>
            <Typography variant="h4" sx={{ paddingLeft: 5 }}>$ {profits} </Typography>
            <hr />
            <Typography variant="h5" sx={{ paddingLeft: 5 }}>Porcentaje de ganancia:</Typography>
            <Typography variant="h4" sx={{ paddingLeft: 5 }}>% {percentage} </Typography>
          </Paper>
        </Grid>


      </Grid>
    </>
  )
}
