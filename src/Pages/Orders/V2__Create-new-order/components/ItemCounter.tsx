import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, Input, TextField, Typography } from '@mui/material';
import { Box } from "@mui/system"
import { FC, useState } from "react"

interface Props {
  currentValue: number;
  maxValue: number;

  //method
  updateQuantity: (newValue: number) => void
};

export const ItemCounter: FC<Props> = ({currentValue, maxValue, updateQuantity}) => {

  const [value, setValue] = useState<number>();

  const setinho = (a: string) => {

    // console.log(a);

    // setValue(Number(a));
    // currentValue = value!;
    updateQuantity(Number(a));
    // setValue(currentValue);
    

  };

  const addOrRemove = (value: number) => {
    if(value === -1){
      if (currentValue === 1) return;
      return updateQuantity( currentValue - 1)
    }

    if( currentValue >= maxValue) return;

    updateQuantity(currentValue + 1);
  };



  return (
    // <Box display='flex' alignItems='center'>
    //   <IconButton onClick={ () => addOrRemove(-1) }>
    //     <RemoveCircleOutline />
    //   </IconButton>

    //   <TextField value={currentValue} onChange={e => setinho(e.target.value)} sx={{ width:100, textAlign: 'center' }}></TextField>

    //   <IconButton onClick={ () => addOrRemove(+1) }>
    //     <AddCircleOutline />
    //   </IconButton>
    // </Box>

    <TextField type='text' label={<Typography variant='h5'>Cantidad</Typography>} value={currentValue} onChange={({target}) => setinho(target.value) } />

  )
}
