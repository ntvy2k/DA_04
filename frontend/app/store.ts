import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import contentSlice from "../features/counter/contentSlice";
import { AuthReducer } from "../features/auth";

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    auth: AuthReducer,
    content: contentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
