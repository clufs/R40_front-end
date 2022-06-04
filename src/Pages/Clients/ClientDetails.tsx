import { DataGrid, GridColDef, gridColumnsTotalWidthSelector, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../Redux/hooks';
import { getRowIdFromRowModel } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils';


const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nombre', width: 140 },
  { field: 'place', headerName: 'Lugar', width: 140 },
  { field: 'income',headerName: 'Ingresos ($)',type: 'number',width: 140  },
  { field: 'profit',headerName: 'Ganancias ($)',type: 'number',width: 140  },
];


export const ClientDetails = () => {

  const {clients} = useAppSelector(state => state.clients)
  console.log(clients);


  return (
    <>
      <h1>Resumen</h1>
      <p>Si esta en un celular: En esta seccion se recomienda tener el celular en forma horizontal.</p>
      <Grid style={{ height: '80vh', width: '100%' }}>

        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </Grid>
    </>
  );
}
