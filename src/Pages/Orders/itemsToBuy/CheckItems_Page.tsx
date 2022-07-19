import { Box, Chip, Grid, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Button, IconButton, Link } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../../Redux/hooks';
import { OrderItems } from '../../../features/orders/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import { EnvoiceToBuy } from './pdfToBuy';
import CommitIcon from '@mui/icons-material/Commit';

interface IOrderToBuy {
  id: string;
  size: number | string;
  color: string;
  cantToBuy?: number | string;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const CheckItems_Page = () => {

  const [open, setOpen] = useState(false);


  const { selected } = useAppSelector(state => state.orders);



  const [productsToBuy, setProductsToBuy] = useState<IOrderToBuy[]>([]);
  const [provItem, setProvItem] = useState<any>();

  const [quantityToBuy, setQuantityToBuy] = useState<number | undefined>(undefined);


  const [productInCart, setProductInCart] = useState(selected.orders);

  const createOrderToBuy = (product: OrderItems) => {

    handleOpen();
    setProvItem(product);

  };

  const handleOpen = () => {

    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };


  const handleAddToPendingBuy = () => {
    // console.log({quantityToBuy, provItem});
    const product: IOrderToBuy = {
      id: provItem?._id || '---',
      size: provItem?.size || '---',
      color: provItem?.color || '---',
      cantToBuy: quantityToBuy! || '---',
    }

    setProductsToBuy(prev => {
      return [...prev, product];
    });

    setQuantityToBuy(undefined);
    setProvItem(undefined);

    setOpen(false);


  };
  let array = productInCart!.map(e => e.statusOfStock === 'out-Stock' ? false : true)

  const [array1, setArray1] = useState<boolean[]>(array);

  const changeStatus = async (id: any) => {
    array![id] = !array![id];
    setArray1(array!);
    // console.log(array1);
  };

  const deleteItem = (i: number) => {
    setProductsToBuy(prev => {
      prev.splice(i, 1);
      return [...prev];
    })
  };

  const getTicketToBuy = () => {
    EnvoiceToBuy(productsToBuy, selected._id)
  };

  const divider =  {
    _id: '---',
    size: '---',
    color: '---',
    cantToBuy: '---',
  };

  const addDivider = () => {
    setProvItem(divider);
    handleAddToPendingBuy();
  };


  return (
    <Grid container>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, display: 'flex', flexDirection: 'column' }} >
          <Typography variant='h6'>Escriba las unidades faltantes.</Typography>
          <TextField label='Unidades Faltantes' sx={{ marginTop: 2 }} type={'number'} onChange={({ target }) => setQuantityToBuy(Number(target.value))} value={quantityToBuy}></TextField>
          <Button variant='contained' sx={{ marginTop: 2 }} onClick={handleAddToPendingBuy}>Agregar</Button>
        </Box>
      </Modal>


      <Grid item xs={12} marginBottom={1}>
        <h1>Control de los productos de la orden</h1>
        <hr />
        <Typography variant='h6'>En esta pagina se va a decidir que productos faltan en nuestro stock,
          comparandolos con los productos de la orden</Typography>
      </Grid>

      <Grid item xs={6} maxHeight={'100px'} padding={2}>
        <Paper sx={{ marginLeft: 2, overflow: 'scroll', maxHeight: 'calc(100vh - 160px)' }}>
          <Table sx={{ maxHeight: '100px' }}>
            <TableHead >
              <TableRow>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Talle</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productInCart!.map((cartItem, id) => (
                <TableRow
                  key={id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: array1![id] === true ? '#c3c3c3' : '',
                  }}
                  onClick={() => changeStatus(id)}
                >
                  <TableCell align="center">{cartItem.quantity}</TableCell>
                  <TableCell align="center">{cartItem.size} </TableCell>
                  <TableCell align="center">{cartItem.color}</TableCell>
                  <TableCell align="center">
                    <Chip label='Agregar para comprar' clickable color='default' onClick={() => createOrderToBuy(cartItem)} />
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>
        </Paper>
      </Grid>

      <Grid item xs={5} marginLeft={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 3 }}>
          <Typography variant='h6'> Productos a comprar. </Typography>
          <IconButton onClick={addDivider}>
            <CommitIcon />
          </IconButton>
          <Button sx={{ fontSize: 15 }} disabled={productsToBuy.length === 0} onClick={getTicketToBuy}>Imprimir Orden de compra</Button>
        </Box>
        <Paper sx={{ marginLeft: 2, overflow: 'scroll', maxHeight: 'calc(100vh - 250px)' }}>




          {
            productsToBuy.length === 0

              ?
              <Box height={'calc(100vh - 270px)'}>
                <Typography variant='h4' textAlign={'center'} paddingTop={'40%'}>No hay productos para comprar.</Typography>
              </Box>
              :
              <Table sx={{ maxHeight: '100px' }}>
                <TableHead >
                  <TableRow>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Talle</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {productsToBuy.map((cartItem, id) => (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{cartItem.cantToBuy}</TableCell>
                      <TableCell align="center">{cartItem.size} </TableCell>
                      <TableCell align="center">{cartItem.color}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete" size="small" onClick={() => deleteItem(id)}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        {/* <Chip label='Listo' clickable sx={{marginX:2}} color='success'/> */}
                        {/* <Chip label='Agregar para comprar' clickable color='default' onClick={() => createOrderToBuy(cartItem)} /> */}
                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>
              </Table>

          }
        </Paper>
      </Grid>
    </Grid>
  )
};


