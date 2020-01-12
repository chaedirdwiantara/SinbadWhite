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

function* PdpSaga() {
  yield takeEvery(types.PDP_GET_PROCESS, getPdp);
}

export default PdpSaga;
