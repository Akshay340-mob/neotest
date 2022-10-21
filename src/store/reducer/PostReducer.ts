import { actionType } from "../../constants/types"

const initialState = {
    posts: []
}



const PostReducer = (state = initialState, action: actionType) => {

    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.data
            }
        default:
            return state

    }
}

export default PostReducer