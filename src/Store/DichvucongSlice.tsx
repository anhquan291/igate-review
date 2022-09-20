import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGet } from "../Services/ApiCall";
import { handleAlert } from "../Utils/Notification";
import { onLogout } from "./AuthSlice";


//action
export const fileGetDataThuTuc = createAsyncThunk(
    "file/get_listthutuc",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        try {
            const response = await requestGet(
                `bd/procedure/--can-apply?keyword=Đăng ký thành lập hộ kinh doanh&spec=page&page=0&size=10&procedure-level-id-not-use=5f5b2c2b4e1bd312a6f3ae23`,
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
//action 2 //
export const fileGetDataThuTuc2 = createAsyncThunk(
    "file/get_listthutuc2",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        try {
            const response = await requestGet(
                `bd/procedure/--can-apply?keyword=chấm dứt hoạt động hộ kinh doanh&spec=page&page=0&size=10&procedure-level-id-not-use=5f5b2c2b4e1bd312a6f3ae23`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("res2", response.data);
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


//reducer
const DichvucongSlice = createSlice({
    name: "dichvucong",
    initialState: {
        isLoading: false,
        fileListDataThuTuc: [],
        fileListDataThuTuc2: [],
        totalPages: 0,
        error: false,
    } as any,
    reducers: {},
    extraReducers: (builder) => {
        // Get File List Thu tuc DVC
        builder.addCase(fileGetDataThuTuc.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetDataThuTuc.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.fileListDataThuTuc = data;
        });
        builder.addCase(fileGetDataThuTuc.rejected, (state) => {
            state.error = true;
        });
        //get thu tuc 2 Chấm dứt hoạt động kdoanh ***************************
        // Get File List Thu tuc DVC
        builder.addCase(fileGetDataThuTuc2.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetDataThuTuc2.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.fileListDataThuTuc2 = data;
        });
        builder.addCase(fileGetDataThuTuc2.rejected, (state) => {
            state.error = true;
        });
    },
});

export default DichvucongSlice.reducer;
