import AsyncStorage from "@react-native-community/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGet, requestPostXform } from "../Services/ApiCall";
import {
  checkTokenExpired,
  removeFromStorage,
  saveToStorage,
} from "../Utils/Common";
import { handleAlert } from "../Utils/Notification";
import jwtDecode from "jwt-decode";

interface initialStateFields {
  token: string;
  refreshToken: string;
  isLogin: boolean;
  isLoading: boolean;
  userData: any;
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
  "auth/get_token",
  async (fields: authTokenParams, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPostXform(
        "auth/realms/digo/protocol/openid-connect/token",
        {
          data: fields,
          needToken: false,
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      handleAlert({
        message:
          error.response === undefined
            ? "Cố lỗi xẩy ra"
            : "Tên đăng nhập hoặc mật khẩu không đúng",
      });
      return rejectWithValue(error);
    }
  },
);
//hàm lấy api của từng cá nhân
export const authGetUserData = createAsyncThunk(
  "auth/get_user_data",
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await requestGet(
        `hu/user/${userId}/--fully?user-id=${userId}`,
        {
          needToken: true,
        },
      );
      console.log('1', response.data);
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      handleAlert({
        message:
          error.response === undefined
            ? "Cố lỗi xẩy ra"
            : "Tên đăng nhập hoặc mật khẩu không đúng",
      });
      return rejectWithValue(error);
    }
  },
);

export const authCheckLogin = createAsyncThunk(
  "auth/check_login",
  async (_, { rejectWithValue }) => {
    try {
      const token: any = await AsyncStorage.getItem("authToken");
      const userData: any = await AsyncStorage.getItem("userData");
      if (token) {
        const isTokenExpire = checkTokenExpired(token);
        return { isTokenExpire, token, userData };
      } else {
        return { isTokenExpire: true };
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const authLogout = createAsyncThunk(
  "auth/auth_logout",
  async (_, { rejectWithValue }) => {
    try {
      removeFromStorage("authToken");
      removeFromStorage("refreshToken");
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    refreshToken: "",
    isLogin: false,
    isLoading: false,
    error: false,
  } as initialStateFields,
  reducers: {
    onLogout: (state: initialStateFields) => {
      state.isLogin = false;
      state.token = "";
      state.refreshToken = "";
    },
  },
  extraReducers: (builder) => {
    // Check Token Expire to Keep Login
    builder.addCase(authLogout.fulfilled, (state, action) => {
      state.isLogin = false;
      state.token = "";
      state.refreshToken = "";
    });
    builder.addCase(authGetToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authGetToken.fulfilled, (state, action) => {
      const { access_token, refresh_token }: any = action.payload;
      saveToStorage("authToken", JSON.stringify(access_token));
      saveToStorage("refreshToken", JSON.stringify(refresh_token));
      state.token = access_token;
      state.refreshToken = refresh_token;
      // state.isLoading = false;
    });
    builder.addCase(authGetToken.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(authGetUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authGetUserData.fulfilled, (state, action) => {
      const userData = action.payload;
      state.userData = userData;
      state.isLoading = false;
      state.isLogin = true;
    });
    builder.addCase(authGetUserData.rejected, (state) => {
      state.isLoading = false;
    });

    // Check Token Expire to Keep Login
    builder.addCase(authCheckLogin.fulfilled, (state, action) => {
      const { isTokenExpire, userData }: any = action.payload;
      if (!isTokenExpire) {
        const user = JSON.parse(userData);
        state.userData = user;
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    });
  },
});

export const { onLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
