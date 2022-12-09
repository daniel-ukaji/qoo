export default (state, action) => {
    switch(action.type) {
        case "ADD_TO_BOOKING":
            return {
                ...state,
                booking: [action.payload, ...state.booking],
            }
        default:
            return state;
    }
    };