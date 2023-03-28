import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import formReducer from './formSlice';  

const makeStore = () =>
  configureStore({
    reducer: {
      form: formReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
