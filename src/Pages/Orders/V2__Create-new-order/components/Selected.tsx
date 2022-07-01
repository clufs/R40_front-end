import { Box, Button } from "@mui/material";

interface Props {
  selectedValue   : string | undefined; 
  arrToMap        : string[] | undefined;
  onSelectedValue : (value: string) => void
};

export const Selected = ({selectedValue, arrToMap, onSelectedValue}:Props) => {

  return (
    <Box>
      {
        arrToMap!.map( value => (
          <Button
            key={value}
            sx={{margin: .5}}
            variant={ selectedValue === value ?'contained': 'outlined'}
            size="small"
            color={selectedValue === value ? 'primary' :'inherit'}
            onClick={ () => onSelectedValue(value) }
          >
            {value}
          </Button>
        ))
      }
    </Box>
  )
}
