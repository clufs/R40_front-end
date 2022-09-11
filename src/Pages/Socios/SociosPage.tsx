import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Card, Grid } from "@mui/material";

interface SociosProps {
  name: string;
  porcentaje: number;
}

const socios: SociosProps[] = [
  {
    name: "Nahuel",
    porcentaje: 53,
  },
  {
    name: "Claudia",
    porcentaje: 23,
  },
  {
    name: "Ruben",
    porcentaje: 23,
  },
];

export const SociosPage = () => {
  return (
    <div>
      <Typography variant="h3"> Socios</Typography>
      <hr />

      <Typography>
        Aca van el porcentaje que corresponde a cada socio.
      </Typography>

      {socios.map(({ name, porcentaje }) => {
        return (
          <Grid container width={500}>
            <Grid item sx={{ width: "100%" }}>
              <Typography variant="h5">Socio: {name}</Typography>
              <Grid display={"flex"} justifyContent={"space-between"}>
                <Typography variant="body1">
                  Porcentaje <strong> {porcentaje}%</strong>
                </Typography>
                <Button variant="outlined" size="small">
                  Editar Porcentaje
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
