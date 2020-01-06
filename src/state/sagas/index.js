import { all, fork } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';
import MerchantSaga from './MerchantSaga';
import JourneySaga from './JourneySaga';
import GlobalSaga from './GlobalSaga';

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(MerchantSaga),
    fork(JourneySaga),
    fork(GlobalSaga)
  ]);
}
