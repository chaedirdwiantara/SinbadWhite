import { put, call, takeEvery, delay } from 'redux-saga/effects';
import { PrivilegeMethod } from '../../services/methods/PrivilegeMethod';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === GET SALES PRIVILEGES === */
function* getPrivileges(actions){
  try {
    const response = yield call(() => {
      return PrivilegeMethod.getPrivileges(actions.payload)
    })
    yield put(ActionCreators.getPrivilegeSuccess(response))
  } catch (error) {
    yield put(ActionCreators.getPrivilegeFailed(error))
  }
}
/** === SAGA FUNCTION === */
function* PrivilegeSaga() {
  yield takeEvery(types.PRIVILEGE_GET_PROCESS, getPrivileges)
}

export default PrivilegeSaga;
