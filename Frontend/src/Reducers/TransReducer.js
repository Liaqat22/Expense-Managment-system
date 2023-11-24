const TransReducer = (state, action) => {
    // switch statement

    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "SET_API_DATA":
            return {
                ...state,
                isLoading: false,
                transitionData: action.payload
            }

            default:
                return state;
    }
}
export default TransReducer