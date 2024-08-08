// userDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id: string;
    username: string;
    email:string;
    imgUrl?: string; // Optional imgUrl property
}

const initialState: User[]  = [];

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<User[]>) => {
            return action.payload;
        },
        removeUserData: () => {
            return [];
        }
    }
});

export const { addUserData, removeUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
