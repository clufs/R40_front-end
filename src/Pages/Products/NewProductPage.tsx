import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Chip } from '@mui/material';
import { FastField, Form, Formik } from "formik"
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { MyTextInput } from "../../Components/formik/MyTextInput";
import { startAddNewProduct, startGetAllProducts } from '../../features/products/product.slice';
import { useAppDispatch } from '../../Redux/hooks';
import { Products } from './Intefaces';
import { SubCategory__Select } from './Components/WizzarProduct';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';




// let sizes:string[] = [];

export const NewProductPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const createNewProduct = (Products: Products) => {
    dispatch(startAddNewProduct(Products));
    dispatch(startGetAllProducts());
    navigate(-1)
  }

  const initialState = {
    profitValue: 0,
    profitPercentage: 0
  };

  const [size, setSize] = useState<any>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const setinho = () => {
    if (!sizes.includes(size)! && size !== '') {
      setSizes(prev => {
        return [...prev, size];
      });
      setSize('')
    };
  };

  const handleDeleteSize = (i: any) => {
    setSizes(prev => {
      prev.splice(i, i + 1);
      return [...prev]
    });
  };

  const [variant, setVariant] = useState<any>();
  const [variants, setVariants] = useState<string[]>([]);

  const setVariantsFunc = () => {
    if (!variants.includes(variant)! && variant !== '') {
      setVariants(prev => {
        return [...prev, variant];
      });
      setVariant('');
    }
  };

  const handleDeleteVariant = (i: number) => {
    setVariants(prev => {
      prev.splice(i, i + 1);
      return [...prev];
    })
  };


  const [color, setColor] = useState<any>();
  const [colors, setColors] = useState<string[]>([])


  const setColorFunc = () => {
    if(!colors.includes(color)! && color!==''){
      setColors(prev => {
        return [...prev, color]
      });
      setColor('');
    }
  }

  const handleDeleteColor = (i: number) => {
    setColors(prev => {
      prev.splice( i, i+1);
      return [...prev];
    })
  };




  return (

    <>
      <h1>Agregar</h1>
      <hr />
      <Formik
        initialValues={{
          name: '',
          category: '',
          subCategory: '',

          sizes: [],
          variants: [],
          colors: [],

          raw_material_price: 0,
          percentage: 0,
          price: 0,
          profits: 0,
          slug: '',

          id: ''
        }}

        onSubmit={(Products: Products) => {
          Products.colors = colors
          Products.sizes = sizes;
          Products.variants = variants;

          Products.percentage = (Products.profits / Products.price) * 100

          console.log(Products);

          createNewProduct(Products);
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
                  <MyTextInput label={"Nombre del producto visible"} name={"name"} />
                  <TextField
                    name='sizes'
                    label="Talles"
                    fullWidth
                    value={size}
                    margin='normal'
                    onChange={e => setSize(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={setinho} variant='contained'>
                          <AddIcon />
                        </Button>
                      )
                    }}
                  />
                  {
                    sizes.map((s, i) => (
                      <Chip sx={{ mt: 1, ml: 1 }} key={i} label={s} onDelete={() => handleDeleteSize(i)} />
                    ))
                  }
                  <TextField

                    name='variant'
                    margin='normal'
                    label="Variantes"
                    fullWidth
                    value={variant}
                    sx={{ mt: 2 }}
                    onChange={e => setVariant(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={setVariantsFunc} variant='contained'>
                          <AddIcon />
                        </Button>
                      )
                    }}
                  />
                  {
                    variants.map((s, i) => (
                      <Chip variant='filled' sx={{ mt: 1, ml: 1 }} key={i} label={s} onDelete={() => handleDeleteVariant(i)} />
                    ))
                  }
                  <TextField

                    name='variant'
                    margin='normal'
                    label="Colores disponibles"
                    fullWidth
                    value={color}
                    sx={{ mt: 2 }}
                    onChange={e => setColor(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={setColorFunc} variant='contained'>
                          <AddIcon />
                        </Button>
                      )
                    }}
                  />
                  {
                    colors.map((s, i) => (
                      <Chip variant='filled' sx={{ mt: 1, ml: 1 }} key={i} label={s} onDelete={() => handleDeleteVariant(i)} />
                    ))
                  }
                </Grid>




                <Grid item xs={12} sm={6}>
                  <MyTextInput label={"Ingrese el precio de venta"} name={"price"} type='number' />
                  <MyTextInput label={"Ingrese el precio de fabricacion"} name={"raw_material_price"} type='number' />
                  <hr />

                  <Card sx={{ padding: 2 }}>
                    <Typography variant='subtitle1'>Ganancias: </Typography>
                    <Typography variant='body1' ><strong>$ {values.profits = values.price - values.raw_material_price}</strong></Typography>

                    <Typography variant='subtitle1'>Porcentage:  </Typography>
                    <Typography variant='body1'><strong> % {values.price !== 0 ? ((values.profits / values.price) * 100).toFixed(2) : 0} </strong></Typography>
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
