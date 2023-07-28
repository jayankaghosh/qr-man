
const initialState = {
    isEnabled: false
}

export default function n(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                isVisible: true,
                message: action.message
            };
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                isVisible: false,
                message: ''
            };
        default:
            return state;
    }
}