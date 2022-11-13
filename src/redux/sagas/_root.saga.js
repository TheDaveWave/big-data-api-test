import { all } from 'redux-saga/effects';
import locationSaga from './location.sagas';

export default function* rootSaga() {
  yield all([
    locationSaga(),
  ]);
}