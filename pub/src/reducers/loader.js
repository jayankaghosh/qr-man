
const initialState = {
    isEnabled: false
}

export default function loader(state = initialState, action) {
    switch (action.type) {
        case 'LOADER_ENABLE':
            return {
                ...state,
                isEnabled: true
            };
        case 'LOADER_DISABLE':
            return {
                ...state,
                isEnabled: false
            };
        default:
            return state;
    }
}