import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { MyTextInput } from '../../Components/formik/MyTextInput';
import { AddNewClient } from '../../features/clients/clients.slice';
import { useAppDispatch } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';

export const NewClient = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()



  return (
    <div>
      <h1>Nuevo</h1>
      <hr />
      <p>Complete los campos con los datos del cliente.</p>

      <Formik
        initialValues={{
          name: '',
          age: 0,

          phone1: 0,
          phone2: 0,

          location: '',
          place: '',

        }}

        onSubmit={(client) => {
          console.log(client);
          dispatch(AddNewClient(client));
          navigate(-1 )

        }}

        validationSchema={yup.object({
          name: yup
            .string()
            .required('Este campo es requerido.'),
          age: yup
            .number()
            .required('Este campo es requerido.'),
          phone1: yup
            .number()
            .required('Este campo es requerido.'),
          phone2: yup
            .number()
            .required('Este campo es requerido.'),
          location: yup
            .string()
            .required('Este campo es requerido.'),
          place: yup
            .string()
            .required('Este campo es requerido.')
        })}
      >
        {
          () => (
            <Form>

              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} marginBottom={1}>
                  <MyTextInput label={"Ingrese el nombre del cliente"} name={"name"} />
                  <MyTextInput label={"Ingrese la edad (aprox)."} name={"age"} type='number' />
                  <MyTextInput label={"Ingrese un numero de contacto"} name={"phone1"} type='number' />
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={1}>
                  <MyTextInput label={"Ingrese un numero secundario"} name={"phone2"} type='number' />
                  <MyTextInput label={"Ingrese su localidad"} name={"location"} />
                  <MyTextInput label={"Ingrese donde se encuentra su local"} name={"place"} />
                </Grid>

                <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Button variant="contained" color='success' type='submit'>Agregar un nuevo cliente</Button>
                </Grid>

              </Grid>

            </Form>

          )
        }
      </Formik>



    </div>
  )
}
