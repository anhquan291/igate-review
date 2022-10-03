import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGet, requestPost, requestPut, requestPut2 } from "../Services/ApiCall";
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
                `bd/procedure/--can-apply?keyword=Đăng ký thành lập hộ kinh doanh&spec=page&page=0&size=20&procedure-level-id-not-use=5f5b2c2b4e1bd312a6f3ae23`,
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
                `bd/procedure/--can-apply?keyword=chấm dứt hoạt động hộ kinh doanh&spec=page&page=0&size=20&procedure-level-id-not-use=5f5b2c2b4e1bd312a6f3ae23`,
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
export const fileGetDataThuTuc3 = createAsyncThunk(
    "file/get_listthutuc3",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        try {
            const response = await requestGet(
                `bd/procedure/--can-apply?keyword=Thông báo hoạt động khuyến mại&spec=page&page=0&size=20&procedure-level-id-not-use=5f5b2c2b4e1bd312a6f3ae23`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("res3", response.data);
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
//file thu tuc detail
export const fileGetDataThuTucDetail = createAsyncThunk(
    "file/get_listthutucdetail",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        console.log('fields', fields);
        try {
            const response = await requestGet(
                `bd/procedure/${fields.id}`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("resdttail", response.data);
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
//action 
//action post thu tục nộp hs
export const postThutuc = createAsyncThunk(
    "rate/post_thutuc",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        // console.log("postThutuc", fields);
        try {
            const response = await requestPost("pa/dossier/--apply-online/", {
                data: fields,
                needToken: true,
            });
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            handleAlert({
                message:
                    error.response.status === 401
                        ? "Hết phiên đăng nhập, vui lòng đăng nhập lại"
                        : "Có lỗi xẩy ra",
                onPress1: error.response.status === 401 ? forceLogout : () => { },
            });
            return rejectWithValue(error);
        }
    },
);
//action lay code pattern
export const fileGetCodePattern = createAsyncThunk(
    "file/get_codepattern",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        // console.log('fieldsss', fields);
        try {
            const response = await requestGet(
                // `bd/config/get-pattern?agency-id=62174f6c378b3c2a75639fcc&procedure-id=6243fed45b82236f1d1c21fe`,
                `bd/config/get-pattern?agency-id=${fields.agencyId}&procedure-id=${fields.procedureId}`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            // console.log("get_codepattern", response.data);
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
//action laays max thu tuc generate moi
export const getNewCode = createAsyncThunk(
    "file/get_newcode",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        try {
            const response = await requestPut2(
                `bt/pattern/${fields.codePattern}/--get-next-value?code=${fields.code}`,
                // `bt/pattern/${fields.codePattern}/--get-next-value?code=${fields.code}`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("resrequestPut2", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error);
            // if (error.response.status === 401) {
            //     handleAlert({
            //         message: "Hết phiên đăng nhập, vui lòng đăng nhập lại",
            //         onPress1: forceLogout,
            //     });
            // }
            return rejectWithValue(error);
        }
    },
);
//data tra cuu
//action
export const fileGetDataTracuu = createAsyncThunk(
    "file/get_datatracuu",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        try {
            const response = await requestGet(
                `pa/dossier/search?sort=updatedDate,desc&page=0&size=10&spec=slice&code=${fields.code}&identity-number=&applicant-name=&applicant-owner-name=&remind-id=`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("tracuu dư lieu", fields);
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
        fileListDataThuTuc3: [],
        //filedetail
        fileThutucDetail: null,
        dataCodePattern: null,
        newcode: null,
        datatracuu: null,
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
        //get thu tuc 3 Thông báo hoạt động khuyến mại ***************************
        builder.addCase(fileGetDataThuTuc3.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetDataThuTuc3.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.fileListDataThuTuc3 = data;
        });
        builder.addCase(fileGetDataThuTuc3.rejected, (state) => {
            state.error = true;
        });
        //get thu tuc detail  ***************************
        builder.addCase(fileGetDataThuTucDetail.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetDataThuTucDetail.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.fileThutucDetail = data;
        });
        builder.addCase(fileGetDataThuTucDetail.rejected, (state) => {
            state.error = true;
        });
        //get code PATTERN
        builder.addCase(fileGetCodePattern.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetCodePattern.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.dataCodePattern = data;
        });
        builder.addCase(fileGetCodePattern.rejected, (state) => {
            state.error = true;
        });
        //get NEW code 
        builder.addCase(getNewCode.pending, (state) => {
            state.error = false;
        });
        builder.addCase(getNewCode.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.newcode = data;
        });
        builder.addCase(getNewCode.rejected, (state) => {
            state.error = true;
        });
        //post thu tuc  ***************************
        builder.addCase(postThutuc.pending, (state) => {
            state.error = false;
        });
        builder.addCase(postThutuc.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            // const data: any = action.payload;
            // state.fileThutucDetail = data;
        });
        builder.addCase(postThutuc.rejected, (state) => {
            state.error = true;
        });

        //tra cuutest
        // Get File List Thu tuc DVC
        builder.addCase(fileGetDataTracuu.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetDataTracuu.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.datatracuu = data;
        });
        builder.addCase(fileGetDataTracuu.rejected, (state) => {
            state.error = true;
        });
    },
});

export default DichvucongSlice.reducer;
