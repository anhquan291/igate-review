import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestPostXform } from '../Services/ApiCall';
import { removeFromStorage, saveToStorage } from '../Utils/Common';
import { handleAlert } from '../Utils/Notification';

interface initialStateFields {
  token: string;
  refreshToken: string;
  isLogin: boolean;
  isLoading: boolean;
  error: boolean;
}

interface authTokenParams {
  client_id: string;
  grant_type: string;
  client_secret: string;
  scope: string;
}

export const authGetToken = createAsyncThunk(
  'auth/get_token',
  async (fields: authTokenParams, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPostXform(
        'auth/realms/digo/protocol/openid-connect/token',
        {
          data: fields,
          needToken: false,
        }
      );
      console.log('res', response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        handleAlert({
          message: 'Hết phiên đăng nhập, vui lòng lấy token mới',
          onPress1: forceLogout,
        });
      }
      return rejectWithValue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    refreshToken: '',
    isLogin: false,
    isLoading: false,
    error: false,
  } as initialStateFields,
  reducers: {
    onLogout: (state) => {
      state.isLogin = false;
      state.token = '';
      state.refreshToken = '';
      removeFromStorage('authToken');
      removeFromStorage('BiometricConfig');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authGetToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authGetToken.fulfilled, (state, action) => {
      const { access_token, refresh_token }: any = action.payload;
      saveToStorage('token', JSON.stringify(access_token));
      saveToStorage('refreshToken', JSON.stringify(refresh_token));
      state.token = access_token;
      state.refreshToken = refresh_token;
      state.isLoading = false;
      state.isLogin = true;
    });
    builder.addCase(authGetToken.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { onLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
