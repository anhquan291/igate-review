import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestGet, requestPost, requestPostXform } from '../Services/ApiCall';
import { removeFromStorage, saveToStorage } from '../Utils/Common';
import { handleAlert } from '../Utils/Notification';

interface initialStateFields {
  isLoading: boolean;
  fileList: any;
  page: number;
  totalPages: number;
  error: boolean;
}

interface fileListParams {
  page: number;
  size: number;
  spec: string;
  code?: string;
}

export const fileGetData = createAsyncThunk(
  'file/get_list',
  async (fields: fileListParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await requestGet('pa/dossier/', {
        params: fields,
        needToken: true,
      });
      console.log('res', response.data);
      return response.data;
    } catch (error: any) {
      console.log('error', error);
      // if (error.response.status === 401) {
      //   handleAlert({
      //     message: 'Hết phiên đăng nhập, vui lòng lấy token mới',
      //     onPress1: forceLogout,
      //   });
      // }
      return rejectWithValue(error);
    }
  }
);

const FileSlice = createSlice({
  name: 'task',
  initialState: {
    isLoading: false,
    fileList: [],
    totalPages: 0,
    error: false,
  } as initialStateFields,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fileGetData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fileGetData.fulfilled, (state, action) => {
      const data: any = action.payload;
      state.fileList = data.content;
      state.totalPages = data.totalPages;
      state.isLoading = false;
    });
    builder.addCase(fileGetData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default FileSlice.reducer;
