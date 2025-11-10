'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '@/common/constants/apiRoutes';

// ✅ dynamically import apiRequest to avoid circular dependency
export const fetchRoles = createAsyncThunk(
  'role/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const { apiRequest } = await import('@/common/api/apiService');
      const response = await apiRequest(apiRoutes.getRoles, 'POST');
      const allRoles = response?.data?.docs || [];
      return allRoles.filter(
        (r) => r.roleName === 'jobseeker' || r.roleName === 'employer'
      );
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch roles');
    }
  }
);

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: [],
    selectedRoleId: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedRoleId: (state, action) => {
      state.selectedRoleId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedRoleId } = roleSlice.actions;
export default roleSlice.reducer;
