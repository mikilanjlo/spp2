import {RERENDER_HEADER} from "../constants/index";

const initialState = {
    shouldRerenderHeader: false
};

function rootReducer(state = initialState, action) {
    if (action.type === RERENDER_HEADER) {
        return Object.assign({}, state, {
            shouldRerenderHeader: action.payload
        })
    }

    return state;
}

export default rootReducer;