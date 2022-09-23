import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGet, requestPost, requestPut } from "../Services/ApiCall";
import { handleAlert } from "../Utils/Notification";
import { onLogout } from "./AuthSlice";


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


//reducer
const TracuuSlice = createSlice({
    name: "tracuu",
    initialState: {
        isLoading: false,
        //
        datatracuu: null,
        totalPages: 0,
        error: false,
    } as any,
    reducers: {},
    extraReducers: (builder) => {
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

export default TracuuSlice.reducer;
