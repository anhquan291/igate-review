import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../Types/ResponseTypes';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserData[],
    loading: true,
    error: false,
  },
  reducers: {},
});

export default usersSlice.reducer;
