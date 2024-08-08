import { configureStore } from "@reduxjs/toolkit";
import userReduser, { User } from "./userSlice"
import userDataReduser from './userDataSlice'

const store=configureStore(
    {
        reducer:{
            user:userReduser,
            userdata:userDataReduser
        }
    }
)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UserState = User[];

export default store