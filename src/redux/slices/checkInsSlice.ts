/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import type { RootState } from '../store';
import { getCheckIns } from '../thunk/checkIns';

export type CheckInsState = {
  data: any;
  loading: boolean;
  error: boolean;
};

const initialState: CheckInsState = {
  data: [],
  loading: true,
  error: false,
};

export const checkInsSlice = createSlice({
  name: 'checkIns',
  initialState,
  reducers: {
    setNotes: (
      state,
      action: PayloadAction<{
        id: string;
        notes: string;
      }>,
    ) => {
      const index = state.data.findIndex(
        (data) => data.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          notes: action.payload.notes,
        };
      }
    },
    setActivityImages: (
      state,
      action: PayloadAction<{
        id: string;
        images: any;
      }>,
    ) => {
      const index = state.data.findIndex(
        (data) => data.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          images: action.payload.images,
        };
      }
    },
    setActivityVideos: (
      state,
      action: PayloadAction<{
        id: string;
        videos: any;
      }>,
    ) => {
      const index = state.data.findIndex(
        (data) => data.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          videos: action.payload.videos,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckIns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCheckIns.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getCheckIns.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setNotes, setActivityImages, setActivityVideos } =
  checkInsSlice.actions;

export const useCheckIns = () => {
  return useAppSelector((state: RootState) => state.checkIns.data);
};

export const useCheckInsLoading = (): boolean => {
  return useAppSelector((state: RootState) => state.checkIns.loading);
};

export const useActivityNotes = (id: string): string | undefined => {
  return useAppSelector(
    (state: RootState) =>
      state.checkIns.data.find((data) => data.id === id)?.notes,
  );
};

export const useActivityImages = (id: string)  => {
  return useAppSelector(
    (state: RootState) =>
      state.checkIns.data.find((data) => data.id === id)?.images || [],
  );
};

export const useActivityVideos = (id: string) => {
  return useAppSelector(
    (state: RootState) =>
      state.checkIns.data.find((data) => data.id === id)?.videos || [],
  );
};

export default checkInsSlice.reducer;
