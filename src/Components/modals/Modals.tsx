import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, InputAdornment, TextField } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setModalOpen1, setModalOpen2, setModalOpen3 } from '../../features/ui/ui.slice';
import { useState } from 'react';
import { startUpdatePrice, startUpdateRawMaterialPrice } from '../../features/products/product.slice';
import { startUpdate__dept } from '../../features/orders/orders.slice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 1,

};

export const BasicModal = () => {

  const { isModalOpen1 } = useAppSelector(state => state.ui)
  const { theChoiceOne } = useAppSelector(state => state.avalible)
  const dispatch = useAppDispatch()


  const [newPrice, setNewPrice] = useState<number>(0);

  const setPrice = (e: any) => {
    setNewPrice(e.target.value);
  };



  const saveNewPrice = () => {
    const profits = newPrice - theChoiceOne.raw_material_price
    // const percentage: string = ((newPrice / theChoiceOne.raw_material_price) * 100).toFixed(2)
    const percentage = ((profits / newPrice) * 100).toFixed(2);
    dispatch(startUpdatePrice(theChoiceOne.id, newPrice, profits, percentage));
    console.log(percentage);
    handleClose()
  };

  const handleClose = () => {
    setNewPrice(0);
    dispatch(setModalOpen1(false))
  };



  return (
    <div>
      <Modal
        open={isModalOpen1}
        onClose={handleClose}
      >
        <Grid sx={style}>

          <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>Cambiar el precio de venta.</Typography>

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaidIcon />
                  </InputAdornment>
                ),
              }}
              label='Nuevo precio de venta'
              type={'number'}
              sx={{ margin: 2 }}
              variant='standard'
              size='medium'
              value={newPrice}
              onChange={e => setPrice(e)}

            />
            <Button variant='contained' sx={{ margin: 2 }} onClick={saveNewPrice}>Actualizar</Button>

          </Box>
        </Grid>

      </Modal>
    </div >
  );
}

export const BasicModal_2 = () => {

  const { isModalOpen2 } = useAppSelector(state => state.ui);
  const { theChoiceOne } = useAppSelector(state => state.avalible);

  const dispatch = useAppDispatch()

  const [newMaterial_Raw_price, setNewMaterial_Raw_price] = useState<number>(0);

  const setPrice = (e: any) => {
    setNewMaterial_Raw_price(e.target.value)
  };

  const saveNewMaterial_Raw_price = () => {
    const profits = theChoiceOne.price - newMaterial_Raw_price;
    // const percentage: string = ((theChoiceOne.price / newMaterial_Raw_price) * 100).toFixed(2);
    const percentage = ((profits / theChoiceOne.price) * 100).toFixed(2);

    dispatch(startUpdateRawMaterialPrice(theChoiceOne.id, newMaterial_Raw_price, profits, percentage));
    handleClose();
  };

  const handleClose = () => {
    setNewMaterial_Raw_price(0);
    dispatch(setModalOpen2(false));
  };



  return (
    <div>
      <Modal
        open={isModalOpen2}
        onClose={handleClose}
      >
        <Grid sx={style}>

          <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>Actualizar el precio de fabricacion.</Typography>

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaidIcon />
                  </InputAdornment>
                ),
              }}
              label='Nuevo precio de fabricacion.'
              type={'number'}
              sx={{ margin: 2 }}
              variant='standard'
              size='medium'
              value={newMaterial_Raw_price}
              onChange={e => setPrice(e)}

            />
            <Button variant='contained' sx={{ margin: 2 }} onClick={saveNewMaterial_Raw_price}>Actualizar</Button>

          </Box>
        </Grid>

      </Modal>
    </div >
  );
}

export const BasicModal_3 = () => {

  const { isModalOpen3 } = useAppSelector(state => state.ui);
  const { selected } = useAppSelector(state => state.orders);

  const dispatch = useAppDispatch()

  const [debt, setMyDebt] = useState<number>(0);

  const setDebt = (e: any) => {
    setMyDebt(e.target.value)
  };

  console.log(debt)

  const saveNewMaterial_Raw_price = () => {
    dispatch(startUpdate__dept(selected._id.toString(), debt));
    handleClose();
  };

  const handleClose = () => {
    setMyDebt(0);
    dispatch(setModalOpen3(false));
  };



  return (
    <div>
      <Modal
        open={isModalOpen3}
        onClose={handleClose}
      >
        <Grid sx={style}>


          <Box sx={{ display: 'flex', flexDirection: 'row' ,padding: 1}}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaidIcon />
                  </InputAdornment>
                ),
              }}
              label='Ingrese el saldo'
              type={'number'}
              variant='standard'
              size='medium'

              value={debt}
              onChange={e => setDebt(e)}

            />
            <Button variant='contained' sx={{ margin: 2 }} onClick={saveNewMaterial_Raw_price}>Actualizar</Button>

          </Box>
        </Grid>

      </Modal>
    </div >
  );
}