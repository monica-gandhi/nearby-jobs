'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '@/common/constants/apiRoutes';

// ✅ dynamically import apiService only inside the thunk
export const fetchJobDomains = createAsyncThunk(
  'jobDomain/fetchJobDomains',
  async (_, { rejectWithValue }) => {
    try {
      const { apiRequest } = await import('@/common/api/apiService');
      const response = await apiRequest(apiRoutes.getJobDomain, 'POST');
      return response?.data?.docs || [];
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch job domains');
    }
  }
);

const jobDomainSlice = createSlice({
  name: 'jobDomain',
  initialState: {
    domains: [],
    selectedDomainId: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDomainId: (state, action) => {
      state.selectedDomainId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDomains.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = action.payload;
      })
      .addCase(fetchJobDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedDomainId } = jobDomainSlice.actions;
export default jobDomainSlice.reducer;
