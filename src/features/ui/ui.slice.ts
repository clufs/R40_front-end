import { RootState, AppThunk } from '../../Redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UIProps {
  isModalOpen1: boolean;
  isModalOpen2: boolean;
  isModalOpen3: boolean;

  isDragging:   boolean;
}

export const initialState: UIProps = {
  isModalOpen1: false,
  isModalOpen2: false,
  isModalOpen3: false,

  isDragging:   false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalOpen1: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalOpen1: action.payload
      }
    },
    setModalOpen2: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalOpen2: action.payload
      }
    },
    setModalOpen3: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalOpen3: action.payload
      }
    },


    setDragging: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isDragging: action.payload
      }
    },
  }
});

export const { setModalOpen1, setModalOpen2, setModalOpen3, setDragging } = uiSlice.actions;

export default uiSlice.reducer;
