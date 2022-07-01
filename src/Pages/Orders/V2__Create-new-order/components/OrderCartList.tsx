import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Icon, Chip, IconButton } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../Redux/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProductToCart } from '../../../../features/newOrder/cartOrder.slice';

export const OrderCartList = () => {

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.newOrder)

  const deleteItem = (id: number) => {
    const newCart = [...cart];
    newCart.splice( id, 1 );
    dispatch(deleteProductToCart(newCart)); 
  };

  return (
    <Paper sx={{ marginLeft: 2, overflow: 'scroll', maxHeight: 'calc(100vh - 160px)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h6'>Orden</Typography>
      </Box>
      <br />
      <Table>
        <TableHead >
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Talle</TableCell>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="center">Color</TableCell>
            <TableCell align="center">Variante</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cart.map((cartItem, id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <IconButton aria-label="delete" size="small" onClick={() => deleteItem(id)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
              <TableCell align="center">{cartItem.quantity}</TableCell>
              <TableCell align="center">{cartItem.size} </TableCell>
              <TableCell align="center"><Chip label={cartItem.name} /></TableCell>
              <TableCell align="center">{cartItem.color}</TableCell>

              <TableCell align="center">{cartItem.variant}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
