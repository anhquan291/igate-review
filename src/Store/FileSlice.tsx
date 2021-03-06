import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { FileDetailFields, FileFields } from "../Models/File";
import { requestGet } from "../Services/ApiCall";
import { removeFromStorage, saveToStorage } from "../Utils/Common";
import { handleAlert } from "../Utils/Notification";
import { onLogout } from "./AuthSlice";

interface initialStateFields {
  isLoading: boolean;
  fileList: FileFields[] | [];
  fileDetail: FileDetailFields | null;
  page: number;
  totalPages: number;
  error: boolean;
}

interface fileDetailParams {
  page?: number;
  size?: number;
  spec?: string;
  code?: string;
}
interface fileListParams extends fileDetailParams {
  "user-id": string;
  agencyId: string;
}

export const fileGetData = createAsyncThunk(
  "file/get_list",
  async (fields: fileListParams, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestGet(
        `pa/dossier/search?sort=updatedDate,desc&page=0&size=10&spec=page&identity-number=&applicant-name=&remind-id=&code=&sector-id=&procedure-id=&nation-id=&province-id=&district-id=&ward-id=&address=&task-status-id=60ebf17309cbf91d41f87f8e&dossier-status=&apply-method-id=&accepted-from=&accepted-to=&appointment-from=&appointment-to=&result-returned-from=&result-returned-to=&agency-id=${fields.agencyId}`,
        {
          // params: fields,
          needToken: true,
        },
      );
      console.log("res", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      if (error.response.status === 401) {
        handleAlert({
          message: "Hết phiên đăng nhập, vui lòng đăng nhập lại",
          onPress1: forceLogout,
        });
      }
      return rejectWithValue(error);
    }
  },
);

export const fileGetDetail = createAsyncThunk(
  "file/get_detail",
  async (fields: fileDetailParams, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestGet("pa/dossier/search", {
        params: fields,
        needToken: true,
      });
      console.log("res", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      handleAlert({
        message:
          error.response.status === 401
            ? "Hết phiên đăng nhập, vui lòng đăng nhập lại"
            : "Có lỗi xẩy ra",
        onPress1: error.response.status === 401 ? forceLogout : () => {},
      });
      return rejectWithValue(error);
    }
  },
);

const FileSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    fileList: [],
    fileDetail: null,
    totalPages: 0,
    error: false,
  } as initialStateFields,
  reducers: {},
  extraReducers: (builder) => {
    // Get File List
    builder.addCase(fileGetData.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fileGetData.fulfilled, (state, action) => {
      const data: any = action.payload;
      state.totalPages = data.totalPages;
      // Check ngày hoàn thành hồ sơ mới nhất
      if (data.pageable.pageNumber === 0) {
        const latestItem = data.content.reduce(
          (
            a: { completedDate: string | number | Date },
            b: { completedDate: string | number | Date },
          ) => {
            return moment(a.completedDate) > moment(b.completedDate) ? a : b;
          },
        );
        state.fileList = [latestItem];
        // state.isLoading = false;
        return;
      }
      state.fileList = [...state.fileList, ...data.content];
      // state.isLoading = false;
    });
    builder.addCase(fileGetData.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    // Get File Detail
    builder.addCase(fileGetDetail.pending, (state) => {
      // state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fileGetDetail.fulfilled, (state, action) => {
      const data: any = action.payload;
      state.fileDetail = data.content[0];
      state.isLoading = false;
    });
    builder.addCase(fileGetDetail.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default FileSlice.reducer;
