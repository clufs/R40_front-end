import { Grid } from "@mui/material"
import { Wizard } from 'react-use-wizard';
import { Category__Select, Product__Select, SubCategory__Select } from "./Components/WizzarProduct";
import { MyStepper } from "../../Components/ui/MyStepperCats";


export const SelectProductPage = () => {

  return (
    <div>
      <h1>Seleccion</h1>
      <hr />

      <Grid container spacing={2} paddingTop={2}>
        <Wizard header={<MyStepper />}> 
          <Category__Select />
          {/* <SubCategory__Select /> */}
          <Product__Select />
        </Wizard>
      </Grid>


    </div>
  )
}





