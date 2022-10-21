import { actionType } from "../../constants/types"
import { SET_USER } from "../actions/Actions"
import { PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    user:Object|null,
    isAuth:boolean
}

const initialState = {
    user: null,
    isAuth:false
}

const UserInfoReducer = (state = initialState, action: PayloadAction<any>) => {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuth:true
            }
        default:
            return state

    }
}

export default UserInfoReducer