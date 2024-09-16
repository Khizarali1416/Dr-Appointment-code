import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import doctorReducer from './features/doctorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctors: doctorReducer,
  },
});

export default store;
