import { put, call, takeEvery } from 'redux-saga/effects';
import { OmsMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST === */
function* getCartItem(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getCartItem(actions.payload);
    });
    yield put(ActionCreators.omsGetCartItemSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsGetCartItemFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* OmsSaga() {
  yield takeEvery(types.OMS_GET_CART_ITEM_PROCESS, getCartItem);
}

export default OmsSaga;
