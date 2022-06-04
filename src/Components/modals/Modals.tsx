import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, InputAdornment, TextField } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setModalOpen1, setModalOpen2 } from '../../features/ui/ui.slice';
import { ChangeEvent, useState } from 'react';
import { startUpdateProductPrice } from '../../features/products/product.slice';

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
  const dispatch = useAppDispatch()

  const [newPrice, setNewPrice] = useState<string>('');

  const setPrice = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewPrice(e.target.value)
  };

  const saveNewPrice = () => {
    dispatch(startUpdateProductPrice('price', newPrice));
    console.log(newPrice)
    handleClose()
  };

  const handleClose = () => {
    setNewPrice('');
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

  const { isModalOpen2 } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()

  const [newPrice, setNewPrice] = useState<string>();

  const setPrice = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewPrice(e.target.value)
  };

  const saveNewPrice = () => {
    // dispatch();
    console.log(newPrice)
    handleModalClose()
  };

  const handleModalClose = () => {
    setNewPrice('');
    dispatch(setModalOpen2(false))
  };



  return (
    <div>
      <Modal
        open={isModalOpen2}
        onClose={handleModalClose}
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