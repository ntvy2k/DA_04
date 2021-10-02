import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import contentSlice from '../features/counter/contentSlice'

export const store = configureStore({
    reducer: {
        // This is where we add reducers.
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