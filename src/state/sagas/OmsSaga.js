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
/** === CART ITEM LIST FROM CHECKOUT === */
function* getCartItemFromCheckout(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getCartItem(actions.payload);
    });
    yield put(ActionCreators.omsGetCartItemFromCheckoutSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsGetCartItemFromCheckoutFailed(error));
  }
}
/** === CHECKOUT ITEM LIST === */
function* getCheckoutItem(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getCheckoutItem(actions.payload);
    });
    yield put(ActionCreators.omsGetCheckoutItemSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsGetCheckoutItemFailed(error));
  }
}
/** === CHECKOUT ITEM LIST === */
function* deleteOrder(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.deleteOrder(actions.payload);
    });
    yield put(ActionCreators.omsDeleteCartItemSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsDeleteCartItemFailed(error));
  }
}
/** === CHECKOUT ITEM LIST === */
function* confirmOrder(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.confirmOrder(actions.payload);
    });
    yield put(ActionCreators.omsConfirmOrderSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsConfirmOrderFailed(error));
  }
}
/** === CHECKOUT ITEM LIST === */
function* getPayment(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getPayment(actions.payload);
    });
    yield put(ActionCreators.omsGetPaymentSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsGetPaymentFailed(error));
  }
}
/** === GET PAYMENT CHANNEL === */
function* getPaymentChannel(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getPaymentChannel(actions.payload);
    });
    yield put(ActionCreators.OmsGetPaymentChannelSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OmsGetPaymentChannelFailed(error));
  }
}
/** === GET TERMS AND CONDITIONS === */
function* getTermsConditions(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getTermsConditions(actions.payload);
    });
    yield put(ActionCreators.OmsGetTermsConditionsSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OmsGetTermsConditionsFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* OmsSaga() {
  yield takeEvery(types.OMS_GET_CART_ITEM_PROCESS, getCartItem);
  yield takeEvery(
    types.OMS_GET_CART_ITEM_FROM_CHECKOUT_PROCESS,
    getCartItemFromCheckout
  );
  yield takeEvery(types.OMS_GET_CHECKOUT_ITEM_PROCESS, getCheckoutItem);
  yield takeEvery(types.OMS_DELETE_CART_ITEM_PROCESS, deleteOrder);
  yield takeEvery(types.OMS_CONFIRM_ORDER_PROCESS, confirmOrder);
  yield takeEvery(types.OMS_GET_PAYMENT_PROCESS, getPayment);
  yield takeEvery(types.OMS_GET_PAYMENT_CHANNEL_PROCESS, getPaymentChannel);
  yield takeEvery(types.OMS_GET_TERMS_CONDITIONS_PROCESS, getTermsConditions);
}

export default OmsSaga;
