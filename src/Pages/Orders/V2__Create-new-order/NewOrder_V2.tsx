import { Box, Button, Card, CardActionArea, Grid, Typography } from "@mui/material"
import Under from 'underscore'

import '../styles.css'
import { useAppSelector } from '../../../Redux/hooks';


export const NewOrder_V2 = () => {

  const { products } = useAppSelector(state => state.products);

  const categories = products.map(p => p.category);
  const unicos = Under.uniq(categories, false)

  console.log({ categories });

  return (
    <>
      <Box display='flex' justifyContent={'space-between'}>
        <h1>Crear nueva Orden</h1>

        <h1>Total: $40.000</h1>
        <Button variant='contained'>CheckOut</Button>
      </Box>

      <hr />
      <Grid container spacing={2} overflow='scroll'>
        {
          unicos.map(p => (
            <Grid item sm={6}>
              <Typography variant='h4'>{p}</Typography>
              <Grid container spacing={2}>
                {
                  products.map(prod => (prod.category === p && (
                    <Grid item xs={3}>
                      <CardActionArea>
                        <Card sx={{ height: 100, padding: 2 }}>
                          <Typography>{prod.name}</Typography>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  )))
                }
              </Grid>
              <hr />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
