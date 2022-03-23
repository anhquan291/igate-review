import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiCall } from '../Services/ApiCall';
import { UserData } from '../Types/ResponseTypes';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response: any = await ApiCall('users', 'GET', { params: { page: 2 } });
  const data = response.data as UserData[];
  // or use it
  // const data: UserData[] = response.data;
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserData[],
    loading: true,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
