import AsyncStorage from '@react-native-community/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestPostXform } from '../Services/ApiCall';
import { checkTokenExpired, removeFromStorage, saveToStorage } from '../Utils/Common';
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
  scope: string;
  username: string;
  password: string;
}

export const authGetToken = createAsyncThunk(
  'auth/get_token',
  async (fields: authTokenParams, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    console.log('field', fields);
    try {
      const response = await requestPostXform(
        'auth/realms/digo/protocol/openid-connect/token',
        {
          data: fields,
          needToken: false,
        },
      );
      console.log('data', response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      handleAlert({
        message:
          error.response.status === 401
            ? 'Hết phiên đăng nhập, vui lòng đăng nhập lại'
            : 'Tên đăng nhập hoặc mật khẩu không đúng',
        onPress1: error.response.status === 401 ? forceLogout : () => {},
      });
      return rejectWithValue(error);
    }
  },
);

export const authCheckLogin = createAsyncThunk(
  'auth/check_login',
  async (_, { rejectWithValue }) => {
    try {
      const token: any = await AsyncStorage.getItem('authToken');
      if (token) {
        const isTokenExpire = checkTokenExpired(token);
        return isTokenExpire;
      } else {
        return true;
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
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
      removeFromStorage('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authGetToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authGetToken.fulfilled, (state, action) => {
      const { access_token, refresh_token }: any = action.payload;
      saveToStorage('authToken', JSON.stringify(access_token));
      saveToStorage('refreshToken', JSON.stringify(refresh_token));
      state.token = access_token;
      state.refreshToken = refresh_token;
      state.isLoading = false;
      state.isLogin = true;
    });
    builder.addCase(authGetToken.rejected, (state) => {
      state.isLoading = false;
    });
    // Check Token Expire to Keep Login
    builder.addCase(authCheckLogin.fulfilled, (state, action) => {
      const isExpired = action.payload;
      if (!isExpired) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    });
  },
});

export const { onLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
