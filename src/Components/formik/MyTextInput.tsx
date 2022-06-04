import { Grid, InputAdornment, TextField } from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik"
import { useAppSelector } from "../../Redux/hooks";
import { Orders } from '../../Pages/Orders/Orders';
import { Products } from '../../Pages/Products/Intefaces';
import { useEffect, useState } from "react";

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placerholder?: string;
  [x: string]: any;
}


export const MyTextInput = ({ label, fullwidth = true, ...props }: Props) => {

  const [field, meta] = useField(props);

  //!estas son propiedades de los input, si queres refrescar la memoria que retornan, quitales el comentario
  // console.log(props);
  // console.log(field)
  // console.log(meta)
  // console.log(meta.error?.length);

  // console.log(field.value)


  


  const saludo = () => 'saludo';


  return (
    <>
      <TextField
        {...props}
        {...field}
        label={label}
        name={props.name}
        type={props.type}
        fullWidth={fullwidth}
        error={meta.error?.length !== undefined}
        helperText={meta.error}
        margin="normal"
        value={field.value}
      />


      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={props.name} component={'span'} /> */}




    </>
  )
}

export interface props2 {
  Order: props3[] 
  Client: string;
  TotalPrice: number;
  TotalProfit: number;
}

interface props3   {
  cant: number;
  size: number;
  product: string;
  price: number;
  subTotalPrice: number
  profit: number;
}


export const MyPrice = ({ label, fullwidth = true, value = 0, index, ...props }: Props) => {

  const { values } = useFormikContext<props2>()

  const { products } = useAppSelector(state => state.products)


  const [field, meta] = useField(props);

  //!estas son propiedades de los input, si queres refrescar la memoria que retornan, quitales el comentario
  // console.log(props);
  // console.log(field)
  // console.log(meta)
  // console.log(meta.error?.length);

  // console.log(values.Order[index].cant)


  return (
    <>
      <TextField
        {...props}
        {...field}
        label={label}
        name={props.name}
        type={props.type}
        fullWidth={fullwidth}
        error={meta.error?.length !== undefined}
        helperText={meta.error}
        margin="normal"
        value={values.Order[index].price = products.find(e => e.name === values.Order[index].product)?.price || 0}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />


      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={props.name} component={'span'} /> */}




    </>
  )
}


export const MyPriceSubTotal = ({ label, fullwidth = true, value = 0, index, ...props }: Props) => {

  const { values } = useFormikContext<props2>()

  const [field, meta] = useField(props);



  return (
    <>
      <TextField
        {...props}
        {...field}
        label={label}
        name={props.name}
        type={props.type}
        fullWidth={fullwidth}
        error={meta.error?.length !== undefined}
        helperText={meta.error}
        margin="normal"
        value={values.Order[index].subTotalPrice = values.Order[index].cant * values.Order[index].price}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />


      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={props.name} component={'span'} /> */}




    </>
  )
}



export const MyProfit = ({ label, fullwidth = true, value = 0, index, ...props }: Props) => {

  const { values } = useFormikContext<props2>()

  const { products } = useAppSelector(state => state.products)


  const nuestroProductoProfit = products.find( e => e.name === values.Order[index].product)?.profits || 0

  const [field, meta] = useField(props);





  return (
    <>
      <TextField
        {...props}
        {...field}
        label={label}
        name={props.name}
        type={props.type} 
        fullWidth={fullwidth}
        error={meta.error?.length !== undefined}
        helperText={meta.error}
        margin="normal"
        value={values.Order[index].profit = nuestroProductoProfit * values.Order[index].cant || 0 }
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />


      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={props.name} component={'span'} /> */}

    </>
  )
}





