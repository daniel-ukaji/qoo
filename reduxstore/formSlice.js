import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFormData } = formSlice.actions;

export const selectFormData = (state) => state.form;

export default formSlice.reducer;
