import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get('http://localhost:5000/api/doctors');
  return response.data;
});

const doctorSlice = createSlice({ 
  name: 'doctors',
  initialState: {
    doctorList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => { 
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorList = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;
