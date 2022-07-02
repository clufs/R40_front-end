import { Typography, Box, Button, Grid, Paper, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { ItemCounter } from './components/ItemCounter';
import { useEffect, useState } from 'react';
import { Selected } from './components/Selected';
import { AddToCart } from '../../../features/newOrder/cartOrder.slice';
import { OrderCartList } from './components/OrderCartList';


export interface ItemCartProps {
  _id: string;
  name: string;
  price: number;
  profits: number;

  color: string | undefined;
  variant: string | undefined;
  size: string | undefined;

  subTotal: number;
  profit: number;
  quantity: number;

}

export const NewOrder_ProductPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { selected, cart } = useAppSelector(state => state.newOrder)

  const [tempProductCart, setTempProductCart] = useState<ItemCartProps>({
    _id: selected!.id,
    name: selected!.name,
    price: selected!.price,
    profits: selected!.profits,

    color: '-',
    variant: '-',
    size: '' || undefined,

    subTotal: 0,
    profit: 0,

    quantity: 1,
  });



  const onUpdateQuantity = (newQuantity: number) => {
    setTempProductCart(currentProduct => ({
      ...currentProduct,
      quantity: newQuantity
    }))
  }

  const onSelectedSize = (size: any) => {
    setTempProductCart(currentValue => ({
      ...currentValue,
      size,
    }))
  }

  const onSelectdColor = (color: any) => {
    setTempProductCart(currentValue => ({
      ...currentValue,
      color,
    }))
  }

  const onSelectVariant = (variant: any) => {
    setTempProductCart(currentValue => ({
      ...currentValue,
      variant,
    }))
  }


  const onAddToCart = () => {
    dispatch(AddToCart(tempProductCart, cart));
  };

  useEffect(() => {
    setTempProductCart(prev => ({
      ...prev,
      subTotal: prev.quantity * prev.price
    }
    ))
  }, [tempProductCart.quantity]);


  return (
    <>
      <Box display='flex' justifyContent={'space-between'}>
        {/* <h1>{'remera blabla'}</h1> */}
        <Button variant='contained' onClick={() => navigate(-1)}>Volver</Button>
      </Box>

      <Grid container paddingTop={4}>
        <Grid xs={6}>
          <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='overline'>Producto:</Typography>
            <Typography variant='body1'>{selected?.name}</Typography>
            <hr />
            <Typography variant='body1'>Cantidad:</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ItemCounter currentValue={tempProductCart.quantity} maxValue={1000} updateQuantity={(newValue) => onUpdateQuantity(newValue)} />
              <Box >
                <Paper elevation={3} sx={{ padding: 1 }}>
                  <Typography variant='overline'>SubTotal</Typography>
                  <Typography variant='h6'>${tempProductCart.subTotal}</Typography>
                </Paper>
              </Box>
            </Box>

            <Typography variant='overline'>Talles:</Typography>
            <Box display='flex' >
              <Selected
                arrToMap={selected!.sizes}
                selectedValue={tempProductCart!.size}
                onSelectedValue={(size) => onSelectedSize(size)}
              />
            </Box>
            <Typography variant='overline'>Colores:</Typography>
            <Box display='flex' >

              <Selected
                arrToMap={selected!.colors}
                selectedValue={tempProductCart!.color}
                onSelectedValue={(color) => onSelectdColor(color)}
              />

            </Box>

            <Typography variant='overline'>Variantes:</Typography>
            <Box display='flex' >
              <Selected
                arrToMap={selected!.variants}
                selectedValue={tempProductCart!.variant}
                onSelectedValue={(variant) => onSelectVariant(variant)}
              />
            </Box>
            <Button sx={{ mt: 2 }} variant='contained' onClick={onAddToCart}>Agregar a la orden</Button>
          </Paper>
        </Grid>

        <Grid xs={6}>
          <OrderCartList />
        </Grid>

      </Grid>

    </>
  )

}
