import { put, call, takeEvery } from 'redux-saga/effects';
import { AuthMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';

function* getOTP(actions) {
  try {
    const response = yield call(() => {
      return AuthMethod.getOTP(actions.payload);
    });
    yield put(ActionCreators.otpGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.otpGetFailed(error));
  }
}

function* AuthSaga() {
  yield takeEvery(types.OTP_GET_PROCESS, getOTP);
}

export default AuthSaga;
