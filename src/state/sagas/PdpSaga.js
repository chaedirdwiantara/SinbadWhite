import { put, call, takeEvery } from 'redux-saga/effects';
import { PdpMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';

function* getPdp(actions) {
  try {
    const response = yield call(() => {
      return PdpMethod.getPdp(actions.payload);
    });
    yield put(ActionCreators.pdpGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.pdpGetFailed(error));
  }
}
/** GET PDP DETAIL */
function* getDetailPdp(actions) {
  try {
    const response = yield call(() => {
      return PdpMethod.getDetailPdp(actions.payload);
    });
    yield put(ActionCreators.pdpGetDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.pdpGetDetailFailed(error));
  }
}

function* PdpSaga() {
  yield takeEvery(types.PDP_GET_PROCESS, getPdp);
  yield takeEvery(types.PDP_GET_DETAIL_PROCESS, getDetailPdp);
}

export default PdpSaga;
