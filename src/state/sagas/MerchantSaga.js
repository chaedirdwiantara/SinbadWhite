import { put, call, takeEvery } from 'redux-saga/effects';
import { MerchantMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST BY PORTFOLIO V2 === */
function* getMerchantV2(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantV2(actions.payload);
    });
    yield put(ActionCreators.merchantGetSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetFailedV2(error));
  }
}
/** === MERCHANT LIST BY PORTFOLIO EXCLUDE STORE ON JOURNEY PLAN === */
function* getMerchantExisting(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantExisting(actions.payload);
    });
    yield put(ActionCreators.merchantExistingGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantExistingGetFailed(error));
  }
}
/** === MERCHANT DETAIL V2 === */
function* getMerchantDetailV2(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantDetailV2(actions.payload);
    });
    yield put(ActionCreators.merchantGetDetailSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetDetailFailedV2(error));
  }
}
/** === PORTFOLIO BY USERID V2 === */
function* getPortfolioV2(actions) {
  try {
    let response = yield call(() => {
      return MerchantMethod.getPortfolioByUserIdV2();
    });
    let newData = [];
    newData.push(response.data.data);
    response.data.data = newData;
    yield put(ActionCreators.portfolioGetSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.portfolioGetSuccessV2(error));
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
/** === POST ACTIVITY MERCHANT V2 === */
function* postActivityV2(actions) {
  try {
    let response = yield call(() => {
      return MerchantMethod.postActivityV2(actions.payload);
    });
    response.data.data = {
      ...response.data.data,
      activity: actions.payload.activityName
    };
    yield put(ActionCreators.merchantPostActivitySuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.merchantPostActivityFailedV2(error));
  }
}
/** === GET ALL LOG ACTIVITY MERCHANT V2 === */
function* getLogAllActivityV2(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getLogAllActivityV2(actions.payload);
    });
    yield put(ActionCreators.merchantGetLogAllActivitySuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLogAllActivityFailedV2(error));
  }
}
/** === GET LOG PER ACTIVITY MERCHANT V2 === */
function* getLogPerActivityV2(actions) {
  try {
    let response = yield call(() => {
      return MerchantMethod.getLogPerActivityV2(actions.payload);
    });
    let newData = [];
    if (response.data.data) {
      newData.push(response.data.data);
    }
    response.data.data = newData;
    yield put(ActionCreators.merchantGetLogPerActivitySuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLogPerActivityFailedV2(error));
  }
}
/** === GET LATEST CHECK IN AND CHECK OUT (LAST STORE) === */
function* getLatestCheckInOut(actions) {
  try {
    let response = yield call(() => {
      return MerchantMethod.getLatestCheckInOut(actions.payload);
    });
    yield put(ActionCreators.merchantGetLatestCheckInOutSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLatestCheckInOutFailed(error));
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
/** VALIDATE AREA MAPPING */
function* validateAreaMapping(actions){
  try {
    const response = yield call(() => {
      return MerchantMethod.validateAreaMapping(actions.payload)
    })
    yield put(ActionCreators.validateAreaMappingSuccess(response))
  } catch (error) {
    yield put(ActionCreators.validateAreaMappingFailed(error))
  }
}
/** GET SURVEY LIST */
function* getSurveyList(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getSurveyList(actions.payload);
    });
    yield put(ActionCreators.merchantGetSurveyListSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetSurveyListFailed(error));
  }
}
/** GET SURVEY RESPONSE */
function* getSurvey(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getSurveyResponse(actions.payload);
    });
    yield put(ActionCreators.merchantGetSurveySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetSurveyFailed(error));
  }
}
/** SUBMIT SURVEY */
function* submitSurvey(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.submitSurvey(actions.payload);
    });
    yield put(ActionCreators.merchantSubmitSurveySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantSubmitSurveyFailed(error));
  }
}
/** UPDATE SURVEY RESPONSE */
function* updateSurvey(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.updateSurvey(actions.payload);
    });
    yield put(ActionCreators.merchantSubmitSurveySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantSubmitSurveyFailed(error));
  }
}
/** GET SALES SEGMENTATION */
function* getSalesSegmentation(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getSalesSegmentation(actions.payload);
    });
    yield put(ActionCreators.getSalesSegmentationSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getSalesSegmentationFailed(error));
  }
}

/** === SAGA FUNCTION === */
function* MerchantSaga() {
  yield takeEvery(types.MERCHANT_GET_PROCESS_V2, getMerchantV2);
  yield takeEvery(types.MERCHANT_EXISTING_GET_PROCESS, getMerchantExisting);
  yield takeEvery(types.MERCHANT_GET_DETAIL_PROCESS_V2, getMerchantDetailV2);
  yield takeEvery(types.PORTFOLIO_GET_PROCESS_V2, getPortfolioV2);
  yield takeEvery(types.MERCHANT_ADD_PROCESS, addMerchant);
  yield takeEvery(types.MERCHANT_EDIT_PROCESS, editMerchant);
  yield takeEvery(types.MERCHANT_GET_LAST_ORDER_PROCESS, getMerchantLastOrder);
  yield takeEvery(types.MERCHANT_POST_ACTIVITY_PROCESS_V2, postActivityV2);
  yield takeEvery(types.MERCHANT_NO_ORDER_REASON_GET_PROCESS, getNoOrderReason);
  yield takeEvery(
    types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS_V2,
    getLogAllActivityV2
  );
  yield takeEvery(
    types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS_V2,
    getLogPerActivityV2
  );
  yield takeEvery(
    types.MERCHANT_GET_LATEST_CHECK_IN_OUT_PROCESS,
    getLatestCheckInOut
  );
  yield takeEvery(types.MERCHANT_STORE_STATUS_PROCESS, getStoreStatus),
  yield takeEvery(types.MERCHANT_GET_WAREHOUSE_PROCESS, getWarehouse);
  yield takeEvery(types.VALIDATE_AREA_MAPPING_PROCESS, validateAreaMapping);
  yield takeEvery(types.MERCHANT_GET_SURVEY_LIST_PROCESS, getSurveyList);
  yield takeEvery(types.MERCHANT_GET_SURVEY_PROCESS, getSurvey);
  yield takeEvery(types.MERCHANT_SUBMIT_SURVEY_PROCESS, submitSurvey);
  yield takeEvery(types.MERCHANT_UPDATE_SURVEY_PROCESS, updateSurvey);
  yield takeEvery(types.GET_SALES_SEGMENTATION_PROCESS, getSalesSegmentation);
}

export default MerchantSaga;
