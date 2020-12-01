const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    isFetching: false
}

export const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})