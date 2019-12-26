import { all, fork } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';
import MerchantSaga from './MerchantSaga';

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(MerchantSaga)]);
}
