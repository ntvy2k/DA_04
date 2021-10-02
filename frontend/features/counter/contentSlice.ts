import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: 'content',
    initialState: [],
    reducers: {
        addData(state: any, action) {
            state.push(action.payload)
        }
    }
})

const { actions, reducer } = contentSlice;
export const { addData } = actions;
export default reducer