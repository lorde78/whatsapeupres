// Actions
const USERLISTSET = "USERLISTSET";

// Action creators
export const userListSet = () => ({
    type: USERLISTSET,
})



// Initial state
const initialState = {
    userList: undefined
}

// Root reducer
const rootReducer = (state = initialState, action, data) => {
    switch (action.type) {
        case USERLISTSET:
            return {
                ...state,
                counter: state.userList = data
            }
        default:
            return state
    }
}

export default rootReducer