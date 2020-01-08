import { put, call, takeEvery } from 'redux-saga/effects';
import { OmsMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === CART ITEM LIST === */
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
/** === CHECKOUT ITEM LIST === */
function* getCheckoutItem(actions) {
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
  yield takeEvery(types.OMS_GET_CHECKOUT_ITEM_PROCESS, getCheckoutItem);
}

export default OmsSaga;
