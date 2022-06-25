import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import row from "antd/lib/row";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ProductChartPercentage } from "../../Components/charts/ProductChartPercentage";
import { setCountStep, setEmptySelect } from "../../features/products/select.slice"
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

export const Products = () => {

  const dispatch = useAppDispatch()
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(setCountStep(0));
    dispatch(setEmptySelect())
  }, [])

  const navigate = useNavigate();

  const addNewProductPage = () => {
    navigate('/productos/nuevo');
  };

  const selectProductPage = () => {
    navigate('/productos/seleccionar');
  };

  const viewStock = () => {
    navigate('/productos/stock');
  };



  const productsToSort = [...products];
  productsToSort.sort((a, b) => b.percentage - a.percentage)



  return (
    <>
      <h1>Productos</h1>
      <hr />
      <Grid container spacing={2}>

        <Grid item xs={12} sm={9} >
          <Card sx={{ height: 'auto' }} >
            <CardHeader title='Productos con mayor ganancia.' />

            <Card sx={{ maxHeight: '100%', height: 'calc(100vh - 210px)', margin: 1, overflow: 'scroll' }} >

              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell align="center">n</TableCell>
                    <TableCell align="center">Producto</TableCell>
                    <TableCell align="center">Precio</TableCell>
                    <TableCell align="center">Precio de Elaboracion </TableCell>
                    <TableCell align="center">Ganancias</TableCell>
                    <TableCell align="center"> % de ganancias</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {productsToSort.map((product, id) => (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center"><strong>{product.subCategory}</strong> - {product.name}</TableCell>
                      <TableCell align="center">$ {product.price}</TableCell>
                      <TableCell align="center">$ {product.raw_material_price}</TableCell>
                      <TableCell align="center">$ {product.profits}</TableCell>
                      <TableCell align="center">% {product.percentage?.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>


            </Card>

          </Card>

        </Grid>


        <Grid item xs={12} sm={3}  >
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant='contained' color="success" sx={{ padding: 1, margin: 1, width: '100%' }} onClick={selectProductPage}>
              Seleccionar un producto
            </Button>
            <Button variant='contained' color="success" sx={{ padding: 1, margin: 1, width: '100%' }} onClick={addNewProductPage}>
              <Typography sx={{ whiteSpace: 'pre-line' }}>
                Agregar un nuevo producto
              </Typography>
            </Button>

            <Button disabled variant='contained' color="success" sx={{ padding: 1, margin: 1, width: '100%' }} onClick={viewStock}>
              <Typography sx={{ whiteSpace: 'pre-line' }}>
                Stock
              </Typography>
            </Button>
          </Card>
        </Grid>

      </Grid>
    </>
  )
}
