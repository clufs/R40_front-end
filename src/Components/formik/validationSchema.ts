import * as yup from 'yup';




export const validationSchema = yup.object({
  name: yup
    .string()
    .max(15, "debe tener 15 caracteres o menos")
    .min(2, "debe tener almenos 2 caracteres")
    .required("requerido"),
  email: yup.string().email("email invalido").required("requerido"),
  password: yup
    .string()
    .min(6, "debe tener almenos 6 caracteres")
    .required("requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "las contraseñas no coinciden")
    .required("requerido"),
})