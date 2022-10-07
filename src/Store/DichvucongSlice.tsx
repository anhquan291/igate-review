import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGet, requestPost, requestPostUpload, requestPut, requestPut2 } from "../Services/ApiCall";
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
//action upload file
export const uploadFile = createAsyncThunk(
    "file/upload_file",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        let formData = new FormData();
        //upload many file
        const { files } = fields
        for (const file of files) {
            formData.append('files', file) // appending every file to formdata
        }
        //upload 1 file dinh kem
        // formData.append("files", { uri: fields.file.uri, type: fields.file.type, name: fields.file.name })
        formData.append("account-id", fields.accountId)
        console.log('formdata1111', formData);
        try {
            const response = await requestPostUpload(
                `fi/file/--multiple?uuid=1`,
                {
                    params: { uuid: 1 },
                    needToken: true,
                    data: formData
                },
            );
            console.log("upload data123", response.data);
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
//action lấy eformid
export const fileGetEformId = createAsyncThunk(
    "file/get_eformid",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        console.log('feweform', fields)
        try {
            const response = await requestGet(
                `/bd/procedure-process-definition?procedure-id=${fields.procedureId}`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("tracuu get_eformid", fields);
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

//action lấy nation
export const fileGetNation = createAsyncThunk(
    "file/get_nation",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        console.log('nation', fields)
        try {
            const response = await requestGet(
                `/ba/nation`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("tracuu nation", fields);
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
//action lấy nation_tỉnh ()
export const fileGetNation_District = createAsyncThunk(
    "file/get_nation_district",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        console.log('get_nation_district', fields)
        try {
            const response = await requestGet(
                `ba/place/--search?nation-id=${fields.nationId}&parent-type-id=5ee304423167922ac55bea01`,
                ///https://apiquangngai.vnptigate.vn/ba/place/--search?nation-id=5f39f4a95224cf235e134c5c&parent-type-id=5ee304423167922ac55bea01 
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("tracuu get_nation_district", fields);
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
//action lấy nation_quận/huyện ()
export const fileGetNation_Province = createAsyncThunk(
    "file/get_nation_province",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        console.log('get_nation_Province', fields)
        try {
            const response = await requestGet(
                `ba/place/--search?nation-id=${fields.nationId}&parent-type-id=5ee304423167922ac55bea02&parent-id=${fields.nationdistrictId}`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("tracuu get_nation_Province", fields);
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
//action lấy nation_xã ()
export const fileGetNation_Village = createAsyncThunk(
    "file/get_nation_village",
    async (fields: any, { rejectWithValue, dispatch }) => {
        const forceLogout = () => {
            dispatch(onLogout());
        };
        console.log('get_nation_village', fields)
        try {
            const response = await requestGet(
                `ba/place/--search?nation-id=${fields.nationId}&parent-type-id=5ee304423167922ac55bea03&parent-id=${fields.nationprovinceId}`,
                {
                    // params: fields,
                    needToken: true,
                },
            );
            console.log("tracuu get_nation_village", fields);
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


//xử lí data lấy ở màn hình khác mới cần lưu reducer
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
        //file_upload
        //eformId
        eformId: null,
        //nation,nationdistric,province,village
        nationid: null,
        nationdistrict: null,
        nationprovince: null,
        nationvillage: null,
        //
        uploaddataresponse: null,
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
        //GetEformId
        builder.addCase(fileGetEformId.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetEformId.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.eformId = data;
        });
        builder.addCase(fileGetEformId.rejected, (state) => {
            state.error = true;
        });
        //GetNation
        builder.addCase(fileGetNation.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetNation.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.nationid = data;
        });
        builder.addCase(fileGetNation.rejected, (state) => {
            state.error = true;
        });
        //GetNation district
        builder.addCase(fileGetNation_District.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetNation_District.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.nationdistrict = data;
        });
        builder.addCase(fileGetNation_District.rejected, (state) => {
            state.error = true;
        });
        //GetNation province
        builder.addCase(fileGetNation_Province.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetNation_Province.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.nationprovince = data;
        });
        builder.addCase(fileGetNation_Province.rejected, (state) => {
            state.error = true;
        });
        //GetNation village
        builder.addCase(fileGetNation_Village.pending, (state) => {
            state.error = false;
        });
        builder.addCase(fileGetNation_Village.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.nationvillage = data;
        });
        builder.addCase(fileGetNation_Village.rejected, (state) => {
            state.error = true;
        });
        //Get ID code đính kèm trả về
        builder.addCase(uploadFile.pending, (state) => {
            state.error = false;
        });
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            //fulfil call thanh cong (syntax)
            const data: any = action.payload;
            state.uploaddataresponse = data;
        });
        builder.addCase(uploadFile.rejected, (state) => {
            state.error = true;
        });
    },
});

export default DichvucongSlice.reducer;
