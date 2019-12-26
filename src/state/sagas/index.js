import { all, fork } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';

export default function* root() {
  yield all([fork(AuthSaga)]);
}
