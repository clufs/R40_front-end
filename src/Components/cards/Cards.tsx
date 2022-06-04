

import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material'

export const Cards = (props:any) => {



  return (
    <Card
      sx={{ marginBottom: 1 }}
      // onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ display: 'flex', justifyContent: 'center'  }} color='black' variant='body1'>
            Holaaa
          </Typography>
        </CardContent>

        {/* <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2"> hola 2</Typography>
        </CardActions> */}
      </CardActionArea>
    </Card>
  )
}

