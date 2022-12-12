// Actions
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";

// Action creators
export const login = (data) => ({
    type: LOGIN,
    payload: data
})

export const signUp = () => ({
    type: SIGNUP,
    payload: null
})

export const logout = () => ({
    type: LOGOUT,
    payload: null
})

// Initial state
const initialState = {
    jwt: null
}

// Root reducer
const authReducer = (state = initialState, action, data) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                jwt: action.payload
            }
        case SIGNUP:
            return {
                ...state,
                jwt: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                jwt: action.payload
            }
        default:
            return state
    }
}

export default authReducer