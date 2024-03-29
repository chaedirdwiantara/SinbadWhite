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

function* checkPhoneNumberAvailable(actions) {
  try {
    const response = yield call(() => {
      return AuthMethod.checkPhoneNumberAvailable(actions.payload);
    });
    yield put(ActionCreators.checkPhoneNumberAvailableSuccess(response));
  } catch (error) {
    yield put(ActionCreators.checkPhoneNumberAvailableFailed(error));
  }
}

function* singIn(actions) {
  try {
    const response = yield call(() => {
      return AuthMethod.signIn(actions.payload);
    });
    yield put(ActionCreators.signInSuccess(response));
  } catch (error) {
    yield put(ActionCreators.signInFailed(error));
  }
}

function* AuthSaga() {
  yield takeEvery(types.OTP_GET_PROCESS, getOTP);
  yield takeEvery(types.SIGN_IN_PROCESS, singIn);
  yield takeEvery(
    types.CHECK_PHONE_NUMBER_AVAILABLE_PROCESS,
    checkPhoneNumberAvailable
  );
}

export default AuthSaga;
