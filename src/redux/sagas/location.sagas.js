import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* locationSaga() {
    yield takeEvery('GET_CLOSEST', getCloseCities);
}

function* getCloseCities(action) {
    try {
        const coords = action.payload;
        const response = yield axios.get('/api/locations', coords);
        yield put({type: 'SET_LOCATIONS', payload: response.data});
    } catch (err) {
        console.log(err);
    }
}

export default locationSaga;