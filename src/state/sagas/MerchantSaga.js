import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
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
    if (response.data.data) {
      newData.push(response.data.data);
    }
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
/** === GET NO VISIT REASON === */
function* getNoVisitReason(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getNoVisitReason(actions.payload);
    });
    yield put(ActionCreators.merchantGetNoVisitReasonSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetNoVisitReasonFailed(error));
  }
}
/** === POST NO VISIT REASON === */
function* postNoVisitReason(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.postNoVisitReason(actions.payload);
    });
    yield put(ActionCreators.merchantPostNoVisitReasonSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantPostNoVisitReasonFailed(error));
  }
}
/** === GET JOURNEY BOOK DETAIL === */
function* getJourneyBookDetail(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getJourneyBookDetail(actions.payload);
    });
    yield put(ActionCreators.merchantGetDetailJourneyBookSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetDetailJourneyBookFailed(error));
  }
}
/** === GET STORE STATUS === */
function* getStoreStatus(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getStoreStatus(actions.payload);
    });
    yield put(ActionCreators.merchantGetStoreStatusSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetStoreStatusFailed(error));
  }
}
/** GET WAREHOUSE */
function* getWarehouse(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getWarehouse(actions.payload);
    });
    yield put(ActionCreators.merchantGetWarehouseSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetWarehouseFailed(error));
  }
}
/** VALIDATE AREA MAPPING */
function* validateAreaMapping(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.validateAreaMapping(actions.payload);
    });
    yield put(ActionCreators.validateAreaMappingSuccess(response));
  } catch (error) {
    yield put(ActionCreators.validateAreaMappingFailed(error));
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
/** GET TOTAL SURVEY */
function* getTotalSurvey(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getTotalSurvey(actions.payload);
    });
    yield put(ActionCreators.merchantGetTotalSurveySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetTotalSurveyFailed(error));
  }
}
/** GET SURVEY BY ID */
function* getSurvey(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getSurvey(actions.payload);
    });
    yield put(ActionCreators.merchantGetSurveySuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetSurveyFailed(error));
  }
}
/** GET SURVEY BRAND BY SURVEY ID */
function* getSurveyBrand(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getSurveyBrand(actions.payload);
    });
    yield put(ActionCreators.merchantGetSurveyBrandSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetSurveyBrandFailed(error));
  }
}
/** GET SURVEY RESPONSE */
function* getSurveyResponse(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getSurveyResponse(actions.payload);
    });
    let totalScore = 0;
    if (response.data.payload.responsePhoto.length === 0) {
      let arrResult = response.data.payload.survey.questions.map(data => {
        if (data.questionResponseScore !== null) {
          return parseFloat(data.questionResponseScore.score);
        }
      });
      totalScore =
        arrResult[0] !== undefined ? arrResult.reduce((a, b) => a + b, 0) : 0;
    }
    yield put(
      ActionCreators.merchantGetSurveyResponseSuccess(response, totalScore)
    );
  } catch (error) {
    yield put(ActionCreators.merchantGetSurveyResponseFailed(error));
  }
}
/** SUBMIT SURVEY */
function* submitSurveyResponse(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.submitSurveyResponse(actions.payload);
    });
    yield put(ActionCreators.merchantSubmitSurveyResponseSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantSubmitSurveyResponseFailed(error));
  }
}
/** UPDATE SURVEY RESPONSE */
function* updateSurveyResponse(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.updateSurveyResponse(actions.payload);
    });
    yield put(ActionCreators.merchantSubmitSurveyResponseSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantSubmitSurveyResponseFailed(error));
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

/** GET RADIUS LOCK GEOTAG */
function* getRadiusLockGeotag(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getRadiusLockGeotag(actions.payload);
    });
    yield put(ActionCreators.getRadiusLockGeotagSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getRadiusLockGeotagFailed(error));
  }
}

/** === SAGA FUNCTION === */
function* MerchantSaga() {
  yield takeLatest(types.MERCHANT_GET_PROCESS_V2, getMerchantV2);
  yield takeLatest(types.MERCHANT_EXISTING_GET_PROCESS, getMerchantExisting);
  yield takeLatest(types.MERCHANT_GET_DETAIL_PROCESS_V2, getMerchantDetailV2);
  yield takeLatest(types.PORTFOLIO_GET_PROCESS_V2, getPortfolioV2);
  yield takeEvery(types.MERCHANT_ADD_PROCESS, addMerchant);
  yield takeEvery(types.MERCHANT_EDIT_PROCESS, editMerchant);
  yield takeEvery(types.MERCHANT_GET_LAST_ORDER_PROCESS, getMerchantLastOrder);
  yield takeLatest(types.MERCHANT_POST_ACTIVITY_PROCESS_V2, postActivityV2);
  yield takeLatest(
    types.MERCHANT_NO_ORDER_REASON_GET_PROCESS,
    getNoOrderReason
  );
  yield takeLatest(
    types.MERCHANT_NO_VISIT_REASON_GET_PROCESS,
    getNoVisitReason
  );
  yield takeLatest(
    types.MERCHANT_POST_NO_VISIT_REASON_PROCESS,
    postNoVisitReason
  );
  yield takeLatest(
    types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_PROCESS,
    getJourneyBookDetail
  );
  yield takeLatest(
    types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS_V2,
    getLogAllActivityV2
  );
  yield takeLatest(
    types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS_V2,
    getLogPerActivityV2
  );
  yield takeLatest(
    types.MERCHANT_GET_LATEST_CHECK_IN_OUT_PROCESS,
    getLatestCheckInOut
  );
  yield takeEvery(types.MERCHANT_STORE_STATUS_PROCESS, getStoreStatus);
  yield takeEvery(types.MERCHANT_GET_WAREHOUSE_PROCESS, getWarehouse);
  yield takeEvery(types.VALIDATE_AREA_MAPPING_PROCESS, validateAreaMapping);
  yield takeLatest(types.MERCHANT_GET_SURVEY_LIST_PROCESS, getSurveyList);
  yield takeLatest(types.MERCHANT_GET_TOTAL_SURVEY_PROCESS, getTotalSurvey);
  yield takeLatest(types.MERCHANT_GET_SURVEY_PROCESS, getSurvey);
  yield takeLatest(types.MERCHANT_GET_SURVEY_BRAND_PROCESS, getSurveyBrand);
  yield takeLatest(
    types.MERCHANT_GET_SURVEY_RESPONSE_PROCESS,
    getSurveyResponse
  );
  yield takeLatest(
    types.MERCHANT_SUBMIT_SURVEY_RESPONSE_PROCESS,
    submitSurveyResponse
  );
  yield takeLatest(
    types.MERCHANT_UPDATE_SURVEY_RESPONSE_PROCESS,
    updateSurveyResponse
  );
  yield takeEvery(types.GET_SALES_SEGMENTATION_PROCESS, getSalesSegmentation);
  yield takeLatest(types.GET_RADIUS_LOCK_GEOTAG_PROCESS, getRadiusLockGeotag);
}

export default MerchantSaga;
