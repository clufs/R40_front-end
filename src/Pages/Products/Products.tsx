import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Table, Typography } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setCountStep, setEmptySelect } from "../../features/products/select.slice"
import { useAppDispatch } from "../../Redux/hooks"

export const Products = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCountStep(0));
    dispatch(setEmptySelect())
  }, [])
  
  const navigate = useNavigate();

  const addNewProductPage = () => {
    navigate('/productos/nuevo')
  }

  const selectProductPage = () => {
    navigate('/productos/seleccionar')
  }

  return (
    <>
      <h1>Productos</h1>
      <hr />
      <Grid container spacing={2}>

        <Grid item xs={12} sm={8} >
          <Card sx={{ height: 'auto' }} >
            <CardHeader title='Mas vendidos' />
          </Card>
        </Grid>


        <Grid item xs={12} sm={4}  >
          <Card sx={{display: 'flex', flexDirection: 'column' }}>
              <Button variant='contained' color="success" sx={{padding: 1, margin: 1, width: '100%'}} onClick={selectProductPage}>
                  Seleccionar un producto
              </Button>
              <Button variant='contained' color="success" sx={{padding: 1, margin: 1, width: '100%'}} onClick={addNewProductPage}>
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  Agregar un nuevo producto
                </Typography>
              </Button>

          </Card>
        </Grid>
        <Grid item xs={12} sm={8} >
          <Card sx={{ height: 'auto' }} >
            <CardHeader title='Productos con mayor ganancia.' />
          </Card>
        </Grid>

      </Grid>
    </>
  )
}
