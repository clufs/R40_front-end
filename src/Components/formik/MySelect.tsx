import { FormControl, InputLabel, MenuItem, Select, TextField, Divider, Typography } from '@mui/material';
import { ErrorMessage, Field, useField } from "formik"
import { useAppSelector } from "../../Redux/hooks";

interface Props {
  name: string;
  [x: string]: any;
}


export const MySelect = ({ label, ...props }: Props) => {

  const [field, meta] = useField(props);

  const {products} = useAppSelector(state => state.products);


  return (
    <>
      <FormControl fullWidth sx={{marginTop: 2}}>
        <InputLabel>Productos</InputLabel>
        <Select
          {...props}
          {...field}
          label={'Productos'}
        >
          {
            products.map( prod => (
              <MenuItem value={prod.name}><Typography><strong>{`${prod.subCategory} `}</strong>  {`${prod.name}`}</Typography></MenuItem>
            ))
          }
        </Select>

      </FormControl>
    </>
  )
}


export const MySelect2 = ({ label, fullwidth, ...props }: Props) => {

  const [field, meta] = useField(props);

  const {clients} = useAppSelector(state => state.clients);

  return (
    <>
      <FormControl fullWidth={fullwidth} sx={{marginTop: 2}}>
        <InputLabel>Cliente</InputLabel>
        <Select
          {...props}
          {...field}
          label={'Productos'}
        >
          {
            clients.map( client => (
              <MenuItem value={client.name}>{client.name}</MenuItem>
            ))
          }
        </Select>

      </FormControl>
    </>
  )
}






