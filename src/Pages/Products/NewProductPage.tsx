import { Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { FastField, Form, Formik } from "formik"
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { number } from 'yup/lib/locale';
import { MyTextInput } from "../../Components/formik/MyTextInput";
import { startAddNewProduct, startGetAllProducts } from '../../features/products/product.slice';
import { useAppDispatch } from '../../Redux/hooks';
import { Products } from './Intefaces';



export const NewProductPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const createNewProduct = (Products: Products) => {
    dispatch(startAddNewProduct(Products));
    // dispatch(startGetAllProducts());
    navigate(-1)
  }



  return (


    <>
      <h1>Agregar</h1>
      <hr />
      <Formik
        initialValues={{
          name: '',
          category: '',
          subCategory: '',

          temp: '',
          time: '',
          presion: '',

          price: 0,
          size: 0,
          raw_material_price: 0,
          profits: 0,
          percentage: 0
        }}

        onSubmit={(Products) => {
          console.log(Products);
          createNewProduct(Products);
        }}

        validationSchema={yup.object({
          name: yup
            .string()
            .max(30, 'El maximo es 15 caracteres.')
            .required('Este campo es requerido.'),
          category: yup
            .string()
            .max(20, 'El maximo es de 10 caracteres.')
            .required('Este campo es requerido.'),
          subCategory: yup
            .string()
            .max(20, 'El maximo es de 10 caracteres.')
            .required('Este campo es requerido.'),
          size: yup
            .number()
            .default(0),
          price: yup
            .number()
            .required('El precio es requerido.'),
          raw_material_price: yup
            .number()
            .required('El precio de la materia prima es requerido.'),
          percentage: yup
            .number(),
          temp: yup
            .string(),
          time: yup
            .string(),
          presion: yup
            .string(),

        })}
      >
        {
          ({ values }) => (
            <Form>

              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} marginBottom={1}>
                  <MyTextInput label={"Nombre del producto"} name={"name"} />
                  <MyTextInput label={"Nombre de la categoria"} name={"category"} />
                  <MyTextInput label={"Nombre de la sub-categoria"} name={"subCategory"} />
                  <MyTextInput label={"Talle (opcional)"} name={"size"} type='number' />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MyTextInput label={"Ingrese el precio"} name={"price"} type='number' />
                  <MyTextInput label={"Ingrese el precio de fabricacion"} name={"raw_material_price"} type='number' />
                  <Grid item xs={12}>
                    <Card >
                      <CardContent >
                        <Typography variant="h6">
                          Ganancia total:
                        </Typography>

                        <Typography variant="h5">
                          $ {values.profits = values.price - values.raw_material_price}
                        </Typography>

                        <Typography variant="h6">
                          Porcentaje:
                        </Typography>

                        <Typography variant="h5">
                          % {(values.raw_material_price) && (values.percentage = (values.profits * 100) / values.raw_material_price)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

              </Grid>

              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="contained" color='inherit' type='submit'>Agregar nuevo producto</Button>
              </Grid>

            </Form>
          )
        }

      </Formik>


    </>
  )
}
