import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetJourneyPlan: false,
  refreshGetJourneyPlan: false,
  loadingLoadMoreGetJourneyPlan: false,
  loadingSaveMerchantToJourneyPlan: false,
  loadingGetJourneyPlanReport: false,
  /** data */
  dataGetJourneyPlan: [],
  dataGetJourneyPlanReport: null,
  totalDataGetJourneyPlan: 0,
  pageGetJourneyPlan: 0,
  dataSaveMerchantToJourneyPlan: null,
  /** error */
  errorGetJourneyPlan: null,
  errorGetJourneyPlanReport: null,
  errorSaveMerchantToJourneyPlan: null
};

export const journey = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ===================
   * JOURNEY PLAN LIST
   * ===================
   */
  [types.JOURNEY_PLAN_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyPlan: action.payload.loading,
      errorGetJourneyPlan: null
    };
  },
  [types.JOURNEY_PLAN_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyPlan: false,
      loadingLoadMoreGetJourneyPlan: false,
      refreshGetJourneyPlan: false,
      totalDataGetJourneyPlan: action.payload.total,
      dataGetJourneyPlan: [...state.dataGetJourneyPlan, ...action.payload.data]
    };
  },
  [types.JOURNEY_PLAN_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetJourneyPlan: false,
      loadingLoadMoreGetJourneyPlan: false,
      refreshGetJourneyPlan: false,
      errorGetJourneyPlan: action.payload
    };
  },
  [types.JOURNEY_PLAN_GET_RESET](state, action) {
    return {
      ...state,
      pageGetJourneyPlan: 0,
      totalDataGetJourneyPlan: 0,
      dataGetJourneyPlan: []
    };
  },
  [types.JOURNEY_PLAN_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetJourneyPlan: true,
      loadingGetJourneyPlan: true,
      pageGetJourneyPlan: 0,
      totalDataGetJourneyPlan: 0,
      dataGetJourneyPlan: []
    };
  },
  [types.JOURNEY_PLAN_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetJourneyPlan: true,
      pageGetJourneyPlan: action.payload
    };
  },
  /**
   * ==============================
   * SAVE MERCHANT TO JOURNEY PLAN
   * ==============================
   */
  [types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS](state, action) {
    return {
      ...state,
      loadingSaveMerchantToJourneyPlan: true,
      dataSaveMerchantToJourneyPlan: null,
      errorSaveMerchantToJourneyPlan: null
    };
  },
  [types.SAVE_MERCHANT_TO_JOURNEY_PLAN_SUCCESS](state, action) {
    return {
      ...state,
      loadingSaveMerchantToJourneyPlan: false,
      dataSaveMerchantToJourneyPlan: action.payload
    };
  },
  [types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED](state, action) {
    return {
      ...state,
      loadingSaveMerchantToJourneyPlan: false,
      errorSaveMerchantToJourneyPlan: action.payload
    };
  },
  /**
   * ==============================
   * GET JOURNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER
   * ==============================
   */
  [types.JOURNEY_PLAN_GET_REPORT_PROCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanReport: true,
      dataGetJourneyPlanReport: null,
      errorGetJourneyPlanReport: null
    };
  },
  [types.JOURNEY_PLAN_GET_REPORT_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanReport: false,
      dataGetJourneyPlanReport: action.payload
    };
  },
  [types.JOURNEY_PLAN_GET_REPORT_FAILED](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanReport: false,
      errorGetJourneyPlanReport: action.payload
    };
  }
});
