import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestGet, requestPost, requestPostXform } from '../Services/ApiCall';
import { removeFromStorage, saveToStorage } from '../Utils/Common';
import { handleAlert } from '../Utils/Notification';

interface initialStateFields {
  isLoading: boolean;
  taskList: any;
  page: number;
  totalPages: number;
  error: boolean;
}

interface taskListParams {
  page: number;
  size: number;
  spec: string;
  code?: string;
}

export const taskGetData = createAsyncThunk(
  'task/get_list',
  async (fields: taskListParams, { rejectWithValue, dispatch }) => {
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

const TaskSlice = createSlice({
  name: 'task',
  initialState: {
    isLoading: false,
    taskList: [],
    totalPages: 0,
    error: false,
  } as initialStateFields,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(taskGetData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(taskGetData.fulfilled, (state, action) => {
      const data: any = action.payload;
      state.taskList = data.content;
      state.totalPages = data.totalPages;
      state.isLoading = false;
    });
    builder.addCase(taskGetData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default TaskSlice.reducer;
