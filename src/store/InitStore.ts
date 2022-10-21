import { configureStore,combineReducers ,PayloadAction} from "@reduxjs/toolkit";
import UserInfoReducer from "./reducer/UserInfoReducer";
import { LOGOUT } from "./actions/Actions";
import { actionType } from "../constants/types";

const allReducer = combineReducers({
    info:UserInfoReducer
})

const rootReducer = (state:any,action:PayloadAction<any>)=>{
    if(action.type === LOGOUT)
    {
        state = undefined
    }
    return allReducer(state,action);
}

export const store = configureStore({
    reducer:rootReducer
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch