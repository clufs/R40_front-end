import { RootState, AppThunk } from '../../Redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UIProps{

}

export const initialState: UIProps = {

}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers:{ 

  }
});

export const {} = uiSlice.actions;

export default uiSlice.reducer;
