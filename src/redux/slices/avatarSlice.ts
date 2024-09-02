/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import type { RootState } from '../store';
import { getAvatar } from '../thunk/avatarThunk';

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

export const avatarSlice = createSlice({
  name: 'avatars',
  initialState,
  reducers: {
    setUserPhoto: (
      state,
      action: PayloadAction<{
        username: string;
        url: any;
      }>,
    ) => {
      const index = state.data.findIndex(
        (data) => data.username === action.payload.username,
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          photo: action.payload.url,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvatar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = [...state.data, ...payload];
      })
      .addCase(getAvatar.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setUserPhoto } = avatarSlice.actions;

export const useAvatar = (username: string): any => {
  return useAppSelector((state: RootState) => {
    return state.avatars.data.find((avatar) => avatar.username === username);
  });
};

export const useAvatarLoading = (): boolean => {
  return useAppSelector((state: RootState) => state.avatars.loading);
};

export default avatarSlice.reducer;
