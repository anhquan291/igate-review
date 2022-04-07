import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { QuestionFields } from '../Models/Question';
import { FileFields } from '../Screens/Home/Type';
import { requestGet, requestPost, requestPostXform } from '../Services/ApiCall';
import { removeFromStorage, saveToStorage } from '../Utils/Common';
import { handleAlert } from '../Utils/Notification';
import { onLogout } from './AuthSlice';

interface initialStateFields {
  isLoading: boolean;
  data: QuestionFields | null;
  error: boolean;
}

interface qustionListParams {
  page?: number;
  size?: number;
  spec?: string;
  status?: number;
}

export const rateGetData = createAsyncThunk(
  'rate/get_data',
  async (fields: qustionListParams, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestGet('su/rating-officer', {
        params: fields,
        needToken: true,
      });
      console.log('res', response.data);
      return response.data;
    } catch (error: any) {
      console.log('error', error);
      handleAlert({
        message:
          error.response.status === 401 ? 'Hết phiên đăng nhập, vui lòng đăng nhập lại' : 'Có lỗi xẩy ra',
        onPress1: error.response.status === 401 ? forceLogout : () => {},
      });
      return rejectWithValue(error);
    }
  },
);

const RateSlice = createSlice({
  name: 'rate',
  initialState: {
    isLoading: true,
    data: null,
    error: false,
  } as initialStateFields,
  reducers: {},
  extraReducers: (builder) => {
    // Get Question Group
    builder.addCase(rateGetData.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(rateGetData.fulfilled, (state, action) => {
      const data: any = action.payload;
      state.data = data.content[0];
      state.isLoading = false;
    });
    builder.addCase(rateGetData.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default RateSlice.reducer;
