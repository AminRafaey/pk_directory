/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import type { RootState } from '../store';
import { getPlanCategories } from '../thunk/plansThunk';

export type PlansState = {
  data: any;
  loading: boolean;
  error: boolean;
};

const initialState: PlansState = {
  data: [],
  loading: true,
  error: false,
};

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlanCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlanCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getPlanCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const usePlanCategories = () => {
  return useAppSelector((state: RootState) => state.plans.data);
};

export const usePlanLoading = (): boolean => {
  return useAppSelector((state: RootState) => state.plans.loading);
};

export default plansSlice.reducer;
