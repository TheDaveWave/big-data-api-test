import { combineReducers } from "redux";

const locationReducer = (state =[], action) => {
    switch (action.type) {
        case 'SET_LOCATIONS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    locationReducer,
});