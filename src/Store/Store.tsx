import { configureStore } from '@reduxjs/toolkit';
import { ThemeSlice, UserSlice, AuthSlice, FileSlice } from './index';
import RateSlice from './RateSlice';

export const store = configureStore({
  reducer: {
    themes: ThemeSlice,
    users: UserSlice,
    auth: AuthSlice,
    files: FileSlice,
    rate: RateSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(
  //     // correctly typed middlewares can just be used
  //     // createDebugger()
  //   ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
