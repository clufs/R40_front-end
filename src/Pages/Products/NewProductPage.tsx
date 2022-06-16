import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card } from '@mui/material';
import { FastField, Form, Formik } from "formik"
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { MyTextInput } from "../../Components/formik/MyTextInput";
import { startAddNewProduct, startGetAllProducts } from '../../features/products/product.slice';
import { useAppDispatch } from '../../Redux/hooks';

import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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

          raw_material_price: 0,
          percentage: 0,
          price: 0,
          profits: 0,

          id: ''
        }}

        onSubmit={(Products) => {
          console.log(Products);
          // createNewProduct(Products);
        }}

        validationSchema={yup.object({
          name: yup
            .string()
            .max(60, 'El maximo es 30 caracteres.')
            .required('Este campo es requerido.'),
          category: yup
            .string()
            .max(20, 'El maximo es de 10 caracteres.')
            .required('Este campo es requerido.'),

          subCategory: yup
            .string()
            .max(20, 'El maximo es de 10 caracteres.')
            .required('Este campo es requerido.'),

          price: yup
            .string()
            .max(20, 'El maximo es de 10 caracteres.')
            .required('Este campo es requerido.'),

          raw_material_price: yup
            .number()
            .required('El precio de la materia prima es requerido.'),

        })}
      >
        {
          ({ values }) => (
            <Form>

              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} marginBottom={1}>
                  <MyTextInput label={"Nombre de la categoria"} name={"category"} />
                  <MyTextInput label={"Nombre de la subcategoria"} name={"subCategory"} />
                  <MyTextInput label={"Nombre del producto"} name={"name"} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MyTextInput label={"Ingrese el precio de fabricacion"} name={"raw_material_price"} type='number' />
                  <MyTextInput label={"Ingrese el precio de venta"} name={"price"} type='number' />
                  <hr />

                  <Card sx={{ padding: 2 }}>
                    <Typography variant='subtitle1'>Ganancias: </Typography>
                    <Typography variant='body1' ><strong> $ 3000 </strong></Typography>

                    <Typography variant='subtitle1'>Porcentage:  </Typography>
                    <Typography variant='body1'><strong> % 33.4 </strong></Typography>
                  </Card>
                </Grid>

              </Grid>

              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="contained" color='inherit' type='submit'>Agregar nuevo producto</Button>
              </Grid>

            </Form>
          )
        }

      </Formik >


    </>
  )
}
