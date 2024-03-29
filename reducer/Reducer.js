const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };
            case 'MODAL':
            return {
                ...state,
                modalState: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;