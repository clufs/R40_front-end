import { Formik, Form, FieldArray } from 'formik';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { MyTextInput, MyPrice, MyPriceSubTotal, MyProfit } from "../../Components/formik/MyTextInput";
import { MySelect, MySelect2 } from '../../Components/formik/MySelect';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import './styles.css'
import { useAppDispatch } from '../../Redux/hooks';
import { startNewOrder } from '../../features/orders/orders.slice';
import { useNavigate } from 'react-router-dom';
import { setDateFormat } from '../../Helpers/dateFunctions';

export interface OrderProps1 {
  Order: {
    cant: number;
    size: number;
    product: string;
    price: number;

    slug: string;

    subTotalPrice: number;

    status: string,
    profit: number;
  }[];

  Client: string;
  TotalPrice: number;
  TotalProfit: number;

  date: number,
  status: string,
  dateFinish: number,
  period: string,
}




export const NewOrder = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setTotalPriceAndProfit = (order: OrderProps1): void => {
    order.TotalPrice = 0;
    order.TotalProfit = 0;

    order.Order.map(e => {
      order.TotalPrice = order.TotalPrice + e.subTotalPrice;
      order.TotalProfit = order.TotalProfit + e.profit;
    });

  };

  const CreateNewOrder = async (order: OrderProps1) => {

    order.date = Date.now();
    order.status = 'pending';
    order.period = setDateFormat(Date.now())


    dispatch(startNewOrder(order));
    navigate(-1);

  };

  return (

    <Formik
      validateOnChange={false}
      initialValues={{
        Order:
          [
            {
              cant: 0,
              size: 0,
              product: 'pending',
              price: 0,
              subTotalPrice: 0,
              profit: 0,
              status: 'pending',
              slug: ''
            }
          ],
        Client: 'Sin defenir',

        TotalPrice: 0,
        TotalProfit: 0,

        // totalProducts: 0,

        // totalRemerasNinos: 0,
        // totalRemerasAdultos: 0,
        // totalChapas: 0,
        // totalStickers: 0,
        // totalGorras: 0,

        period: '01/2022',


        date: 0,
        status: '',
        dateFinish: 0,
      }}

      onSubmit={(order) => {

        setTotalPriceAndProfit(order)

      }}


    >
      {
        ({ values }) => (
          <>
            <h1>Nueva Orden</h1>
            <hr />
            <Form>
              <Grid container>

                <Grid container spacing={1}>
                  <Grid xs={4} p={1}>
                    <MySelect2 fullwidth={true} label="Cliente" name={`Client`} />
                  </Grid >

                  <Grid xs={4} p={3} container>
                    <Typography variant='h5' align='center' >Total: $ </Typography>
                    <Typography variant='h5' align='justify'>{values.TotalPrice}</Typography>
                  </Grid>

                  <Grid xs={3} paddingTop={3} container>
                    <Typography variant='h5' align='center' >Ganancias: $ </Typography>
                    <Typography variant='h5' align='justify'>{values.TotalProfit}</Typography>
                  </Grid>
                </Grid>


                <FieldArray
                  name="Order"
                  render={arrayHelpers => (
                    <div className="orden-contenedor">
                      {values.Order && values.Order.length > 0 ? (
                        values.Order.map((order, index) => (
                          <Form>
                            <div key={index} >
                              <Grid container >

                                <Grid xs={1} padding={.2}>
                                  <MyTextInput fullwidth={true} label="Cantidad" name={`Order.${index}.cant`} type='number' />
                                </Grid>

                                <Grid xs={.6} padding={.2}>
                                  <MyTextInput fullwidth={true} label="Talle" name={`Order.${index}.size`} type='number' />
                                </Grid >

                                <Grid xs={4} padding={.2}>
                                  <MySelect label="Producto" name={`Order.${index}.product`} />
                                </Grid>

                                <Grid xs={1} padding={.2}>
                                  <MyPrice label={'Precio final'} name={`Order.${index}.price`} index={index} />
                                </Grid >

                                <Grid xs={2} padding={.2}>
                                  <MyPriceSubTotal
                                    label={'Precio Total'}
                                    name={`Order.${index}.subTotalPrice`}
                                    margin="normal"
                                    type='number'
                                    index={index}
                                  />
                                </Grid>

                                <Grid xs={1.5} padding={.2}>
                                  <MyProfit label={'Ganancia Total'} name={`Order.${index}.profit`} index={index} />
                                </Grid >


                                <Grid xs={1.5} >
                                  <IconButton
                                    color="error"
                                    sx={{ marginTop: 3 }}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  <IconButton
                                    sx={{ marginTop: 3 }}
                                    color="success"
                                    onClick={() => arrayHelpers.insert(index,
                                      {
                                        cant: 0,
                                        size: 0,
                                        product: 'pending',
                                        price: 0,
                                        subTotalPrice: 0,
                                        profit: 0,
                                        status: 'pending',
                                        slug: ''

                                      }
                                    )}>
                                    <AddIcon />
                                  </IconButton>

                                </Grid>

                              </Grid>

                            </div>

                          </Form>

                        ))

                      ) : (
                        <Button variant='contained' onClick={() => arrayHelpers.push({
                          cant: 0,
                          size: 0,
                          product: 'pending',
                          price: 0,
                          subTotalPrice: 0,
                          profit: 0,
                          status: 'pending',
                          slug: ''
                        })}>
                          Agregar Productos
                        </Button>

                      )}

                      <hr />

                      <div>
                        <Button sx={{ margin: 2 }} onClick={() => CreateNewOrder(values)}>Submit</Button>
                        <Button type="submit" variant='contained' sx={{ margin: 2 }}>Previsualizacion de precio</Button>
                      </div>
                    </div>
                  )}
                />
              </Grid>

            </Form>
          </>

        )

      }
    </Formik >

  )

};
