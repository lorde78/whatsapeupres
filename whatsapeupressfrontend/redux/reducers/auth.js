// Actions
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

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
                user: state = data
            }
        case SIGNUP:
            return {
                ...state,
                user: state = data
            }
        case LOGOUT:
            return {
                ...state,
                user: state = null
            }
        default:
            return state
    }
}

export default rootReducer