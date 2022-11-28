import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';
import {AuthResult} from '../../usages/AuthResponse';

const initialState: AuthResult = {} as AuthResult;

export const authSlice = createSlice({
  name: Slices.auth,
  initialState,
  reducers: {
    clearAuthSlice: () => initialState,
    storeAuthResult: (state, action: PayloadAction<AuthResult>) => {
      state.data = action.payload.data;
      state.success = action.payload.success;
    },
  },
});

export const {clearAuthSlice} = authSlice.actions;
export default authSlice.reducer;
