import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { OmsMethod } from '../../services/methods';
import {
  finishRecordTransaction,
  startRecordTransaction
} from '../../services/report/datadog/rumDatadog';
import * as ActionCreators from '../actions';
import * as types from '../types';
import { DdTrace } from '@datadog/mobile-react-native';
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
    const { startSpan } = startRecordTransaction('omsCheckout');
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
    finishRecordTransaction('omsCheckout');
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
    // const { startSpan } = startRecordTransaction('omsGetTermsConditions');
    // DdTrace.startSpan('omsGetTermsConditions');
    const response = yield call(() => {
      return OmsMethod.getTermsConditions(actions.payload);
    });
    // DdTrace.finishSpan('omsGetTermsConditions');
    yield put(ActionCreators.OmsGetTermsConditionsSuccess(response));
    // finishRecordTransaction('omsCheckout');
  } catch (error) {
    yield put(ActionCreators.OmsGetTermsConditionsFailed(error));
  }
}
/** === LAST PAYMENT CHANNEL === */
function* getLastPaymentChannel(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getLastPaymentChannel(actions.payload);
    });
    yield put(ActionCreators.omsGetLastPaymentChannelSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsGetLastPaymentChannelFailed(error));
  }
}
/** === CHECK PROMO VA === */
function* checkPromo(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.checkPromo(actions.payload);
    });
    yield put(ActionCreators.omsCheckPromoSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsCheckPromoFailed(error));
  }
}

/** === CHECK PROMO VA === */
function* getPayLaterType(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getPayLaterType(actions.payload);
    });
    yield put(ActionCreators.omsGetPayLaterTypeSuccess(response));
  } catch (error) {
    yield put(ActionCreators.omsGetPayLaterTypeFailed(error));
  }
}

/** === GET APPLICABLE PAYLATER === */
function* getApplicablePaylater(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getApplicablePaylater(actions.payload);
    });
    yield put(ActionCreators.OmsApplicablePaylaterSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OmsApplicablePaylaterFailed(error));
  }
}

/** === GET KUR OTP === */
function* getKurOtp(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getKurOtp(actions.payload);
    });
    yield put(ActionCreators.OmsGetKurOtpSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OmsGetKurOtpFailed(error));
  }
}

/** POST OMS KUR CONSENT */
function* postKurConsent(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.postKurConsent(actions.payload);
    });
    yield put(ActionCreators.OmsPostKurConsentSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OmsPostKurConsentFailed(error));
  }
}

/** GET RETURN DRAFT */
function* getReturnDraft(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getReturnDraft(actions.payload);
    });
    yield put(ActionCreators.GetReturnDraftSuccess(response));
  } catch (error) {
    yield put(ActionCreators.GetReturnDraftFailed(error));
  }
}

/** GET RETURN REASON */
function* getReturnReason(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.getReturnReason(actions.payload);
    });
    yield put(ActionCreators.GetReturnReasonSuccess(response));
  } catch (error) {
    yield put(ActionCreators.GetReturnReasonFailed(error));
  }
}

/** POST RETURN ORDER */
function* postReturnOrder(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.postReturnOrder(actions.payload);
    });
    yield put(ActionCreators.PostReturnOrderSuccess(response));
  } catch (error) {
    yield put(ActionCreators.PostReturnOrderFailed(error));
  }
}

/** GET CHECK OVERDUE */
function* getCheckOverdue(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.checkOverdue(actions.payload);
    });
    yield put(ActionCreators.OMSCheckOverdueSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OMSCheckoutOverdueFailed(error));
  }
}
/** GET CHECK CREDIT LIMIT */
function* getCheckCreditLimit(actions) {
  try {
    const response = yield call(() => {
      return OmsMethod.checkCreditLimit(actions.payload);
    });
    yield put(ActionCreators.OMSCheckCreditSuccess(response));
  } catch (error) {
    yield put(ActionCreators.OMSCheckCreditFailed(error));
  }
}

/** === SAGA FUNCTION === */
function* OmsSaga() {
  yield takeLatest(types.OMS_GET_CART_ITEM_PROCESS, getCartItem);
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
  yield takeEvery(
    types.OMS_GET_LAST_PAYMENT_CHANNEL_PROCESS,
    getLastPaymentChannel
  );
  yield takeEvery(types.OMS_CHECK_PROMO_PROCESS, checkPromo);
  yield takeEvery(types.OMS_GET_PAY_LATER_TYPE_PROCESS, getPayLaterType);
  yield takeEvery(types.OMS_APPLICABLE_PAYLATER_PROCESS, getApplicablePaylater);
  yield takeEvery(types.OMS_GET_KUR_OTP_PROCESS, getKurOtp);
  yield takeEvery(types.OMS_POST_KUR_CONSENT_PROCESS, postKurConsent);
  yield takeEvery(types.GET_RETURN_DRAFT_PROCESS, getReturnDraft);
  yield takeEvery(types.GET_RETURN_REASON_PROCESS, getReturnReason);
  yield takeEvery(types.POST_RETURN_ORDER_PROCESS, postReturnOrder);
  yield takeEvery(types.OMS_CHECK_OVERDUE_PROCESS, getCheckOverdue);
  yield takeEvery(types.OMS_CHECK_CREDIT_PROCESS, getCheckCreditLimit);
}

export default OmsSaga;
