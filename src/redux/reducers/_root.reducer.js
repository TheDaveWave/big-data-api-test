import { combineReducers } from 'redux';
import locations from './location.reducer';


const rootReducer = combineReducers({
    locations,
});

export default rootReducer;