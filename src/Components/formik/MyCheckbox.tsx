import { useField, ErrorMessage } from 'formik';

interface Props {
  name: string;
  label: string;
  [x: string]: any; //esta es cualquier otra propiedad que pueda mandarme una persona
}

export const MyCheckbox = ({ label, ...props }: Props) => {
  // en field esta el onchange, onblur, y value
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <>
      <label>
        <input type="checkbox" {...field} {...props} />
        {label}
      </label>
      <ErrorMessage name={props.name} component={'span'}/>

      {/* esta es otra forma de poner los nombres */}
      {/* {meta.touched && meta.error && <span>{meta.error}</span>} */}
    </>
  );
};
