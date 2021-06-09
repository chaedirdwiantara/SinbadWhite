import { all, fork } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';
import MerchantSaga from './MerchantSaga';
import JourneySaga from './JourneySaga';
import GlobalSaga from './GlobalSaga';
import PdpSaga from './PdpSaga';
import OmsSaga from './OmsSaga';
import HistorySaga from './HistorySaga';
import ProfileSaga from './ProfileSaga';
import SalesmanKpiSaga from './SalesmanKpiSaga';
import PrivilegeSaga from './PrivilegeSaga';

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(MerchantSaga),
    fork(JourneySaga),
    fork(GlobalSaga),
    fork(PdpSaga),
    fork(OmsSaga),
    fork(HistorySaga),
    fork(ProfileSaga),
    fork(SalesmanKpiSaga),
    fork(PrivilegeSaga)
  ]);
}
