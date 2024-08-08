import { createSlice } from "@reduxjs/toolkit";



export interface User {
    id: string;
    name: string;
    imgUrl?: string; // Optional imgUrl property
}

const initialState: User | null = null;
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,acttion)=>{
            return acttion.payload
        },
        removeUser:(state,action)=>{
            return null
        }
    }
})
export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer