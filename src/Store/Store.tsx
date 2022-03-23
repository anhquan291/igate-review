import { configureStore } from '@reduxjs/toolkit';
import { ThemeSlice, UserSlice, AuthSlice } from './index';

export const store = configureStore({
  reducer: {
    themes: ThemeSlice,
    users: UserSlice,
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(
  //     // correctly typed middlewares can just be used
  //     // createDebugger()
  //   ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
