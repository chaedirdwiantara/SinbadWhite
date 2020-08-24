import { put, call, takeEvery } from 'redux-saga/effects';
import { MerchantMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST === */
function* getMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetFailed(error));
  }
}
/** === MERCHANT DETAIL === */
function* getMerchantDetail(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantDetail(actions.payload);
    });
    yield put(ActionCreators.merchantGetDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetDetailFailed(error));
  }
}
/** === PORTFOLIO BY USERID === */
function* getPortfolio(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getPortfolioByUserId(actions.payload);
    });
    yield put(ActionCreators.portfolioGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.portfolioGetSuccess(error));
  }
}
/** === ADD MERCHANT === */
function* addMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.addMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantAddSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantAddFailed(error));
  }
}
/** === EDIT MERCHANT === */
function* editMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.editMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantEditSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantEditFailed(error));
  }
}
/** === MERCHANT DETAIL === */
function* getMerchantLastOrder(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantLastOrder(actions.payload);
    });
    yield put(ActionCreators.merchantGetLastOrderSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLastOrderFailed(error));
  }
}
/** === CHECKIN MERCHANT === */
function* postActivity(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.postActivity(actions.payload);
    });
    yield put(ActionCreators.merchantPostActivitySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantPostActivityFailed(error));
  }
}
/** === CHECKOUT MERCHANT === */
function* getLogAllActivity(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getLogAllActivity(actions.payload);
    });
    yield put(ActionCreators.merchantGetLogAllActivitySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLogAllActivityFailed(error));
  }
}
/** === GET LOG MERCHANT === */
function* getLogPerActivity(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getLogPerActivity(actions.payload);
    });
    yield put(ActionCreators.merchantGetLogPerActivitySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLogPerActivityFailed(error));
  }
}
/** === GET NO ORDER REASON === */
function* getNoOrderReason(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getNoOrderReason(actions.payload);
    });
    yield put(ActionCreators.merchantGetNoOrderReasonSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetNoOrderReasonFailed(error));
  }
}
/** === GET STORE STATUS === */
function* getStoreStatus(actions){
  try {
    const response = yield call(() => {
      return MerchantMethod.getStoreStatus(actions.payload)
    })
    yield put(ActionCreators.merchantGetStoreStatusSuccess(response))
  } catch (error) {
    yield put(ActionCreators.merchantGetStoreStatusFailed(error))
  }
}
/** GET WAREHOUSE */
function* getWarehouse(actions){
  try {
    const response = yield call(() => {
      return MerchantMethod.getWarehouse(actions.payload)
    })
    yield put(ActionCreators.merchantGetWarehouseSuccess(response))
  } catch (error) {
    yield put(ActionCreators.merchantGetWarehouseFailed(error))
  }
}

/** === SAGA FUNCTION === */
function* MerchantSaga() {
  yield takeEvery(types.MERCHANT_GET_PROCESS, getMerchant);
  yield takeEvery(types.MERCHANT_GET_DETAIL_PROCESS, getMerchantDetail);
  yield takeEvery(types.PORTFOLIO_GET_PROCESS, getPortfolio);
  yield takeEvery(types.MERCHANT_ADD_PROCESS, addMerchant);
  yield takeEvery(types.MERCHANT_EDIT_PROCESS, editMerchant);
  yield takeEvery(types.MERCHANT_GET_LAST_ORDER_PROCESS, getMerchantLastOrder);
  yield takeEvery(types.MERCHANT_POST_ACTIVITY_PROCESS, postActivity);
  yield takeEvery(types.MERCHANT_NO_ORDER_REASON_GET_PROCESS, getNoOrderReason);
  yield takeEvery(
    types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS,
    getLogAllActivity
  );
  yield takeEvery(
    types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS,
    getLogPerActivity
  );
  yield takeEvery(types.MERCHANT_STORE_STATUS_PROCESS, getStoreStatus),
  yield takeEvery(types.MERCHANT_GET_WAREHOUSE_PROCESS, getWarehouse)
}

export default MerchantSaga;
