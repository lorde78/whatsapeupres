// Actions
const STARTSESSION = "STARTSESSION";
const STOPSESSION = "STOPSESSION";


// Action creators
export const startsession = (data) => ({
    type: STARTSESSION,
    payload: data,
})

export const stopsession = () => ({
    type: STOPSESSION,
})



// Initial state
const initialState = {
    session: undefined
}

// Root reducer
const chatBoxReducer = (state = initialState, action, data) => {
    switch (action.type) {
        case STARTSESSION:
            return {
                ...state,
                session: action.payload
            }
        case STOPSESSION:
            return {
                ...state,
                session: undefined
            }
        default:
            return state
    }
}

export default chatBoxReducer