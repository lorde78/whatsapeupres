// Actions
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";

// Action creators
export const login = () => ({
    type: LOGIN,
})

export const signUp = () => ({
    type: SIGNUP,
})

export const logout = () => ({
    type: LOGOUT
})

// Initial state
const initialState = {
    user: null
}

// Root reducer
const rootReducer = (state = initialState, action, data) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: state.user = data
            }
        case SIGNUP:
            return {
                ...state,
                user: state.user = undefined
            }
        case LOGOUT:
            return {
                ...state,
                user: state.user = undefined
            }
        default:
            return state
    }
}

export default rootReducer