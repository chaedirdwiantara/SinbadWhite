import * as types from '../types';
import _ from 'lodash';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetJourneyPlan: false,
  refreshGetJourneyPlan: false,
  loadingLoadMoreGetJourneyPlan: false,
  loadingGetJourneyPlanMapData: false,
  loadingSaveMerchantToJourneyPlan: false,
  loadingGetJourneyPlanReport: false,
  /** data */
  dataGetJourneyPlanV2: [],
  dataGetJourneyPlanReportV2: null,
  totalDataGetJourneyPlanV2: 0,
  pageGetJourneyPlanV2: 1,
  dataGetJourneyPlanMapData: null,
  dataSaveMerchantToJourneyPlanV2: null,
  /** error */
  errorGetJourneyPlanV2: null,
  errorGetJourneyPlanMapData: null,
  errorGetJourneyPlanReportV2: null,
  errorSaveMerchantToJourneyPlanV2: null
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
   * JOURNEY PLAN LIST V2
   * ===================
   */
  [types.JOURNEY_PLAN_GET_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetJourneyPlan: action.payload.loading,
      errorGetJourneyPlanV2: null
    };
  },
  [types.JOURNEY_PLAN_GET_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetJourneyPlan: false,
      loadingLoadMoreGetJourneyPlan: false,
      refreshGetJourneyPlan: false,
      totalDataGetJourneyPlanV2: action.payload.meta.total,
      dataGetJourneyPlanV2: [
        ...state.dataGetJourneyPlanV2,
        ...action.payload.data
      ]
    };
  },
  [types.JOURNEY_PLAN_GET_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetJourneyPlan: false,
      loadingLoadMoreGetJourneyPlan: false,
      refreshGetJourneyPlan: false,
      errorGetJourneyPlanV2: action.payload
    };
  },
  [types.JOURNEY_PLAN_GET_RESET_V2](state, action) {
    return {
      ...state,
      pageGetJourneyPlanV2: 1,
      totalDataGetJourneyPlanV2: 0,
      dataGetJourneyPlanV2: []
    };
  },
  [types.JOURNEY_PLAN_GET_REFRESH_V2](state, action) {
    return {
      ...state,
      refreshGetJourneyPlan: true,
      loadingGetJourneyPlan: true,
      pageGetJourneyPlanV2: 1,
      totalDataGetJourneyPlanV2: 0,
      dataGetJourneyPlanV2: []
    };
  },
  [types.JOURNEY_PLAN_GET_LOADMORE_V2](state, action) {
    return {
      ...state,
      loadingLoadMoreGetJourneyPlan: true,
      pageGetJourneyPlanV2: action.payload
    };
  },
  /**
   * ===================
   * JOURNEY PLAN MAP DATA
   * ===================
   */
  [types.JOURNEY_PLAN_GET_MAP_DATA_PROCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanMapData: true,
      dataGetJourneyPlanMapData: null,
      errorGetJourneyPlanMapData: null
    };
  },
  [types.JOURNEY_PLAN_GET_MAP_DATA_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanMapData: false,
      dataGetJourneyPlanMapData: action.payload.data
    };
  },
  [types.JOURNEY_PLAN_GET_MAP_DATA_FAILED](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanMapData: false,
      errorGetJourneyPlanMapData: action.payload
    };
  },
  [types.JOURNEY_PLAN_GET_MAP_DATA_RESET](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanMapData: false,
      dataGetJourneyPlanMapData: null,
      errorGetJourneyPlanMapData: null
    };
  },
  /**
   * ==============================
   * SAVE MERCHANT TO JOURNEY PLAN V2
   * ==============================
   */
  [types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingSaveMerchantToJourneyPlan: true,
      dataSaveMerchantToJourneyPlanV2: null,
      errorSaveMerchantToJourneyPlanV2: null
    };
  },
  [types.SAVE_MERCHANT_TO_JOURNEY_PLAN_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingSaveMerchantToJourneyPlan: false,
      dataSaveMerchantToJourneyPlanV2: action.payload
    };
  },
  [types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED_V2](state, action) {
    return {
      ...state,
      loadingSaveMerchantToJourneyPlan: false,
      errorSaveMerchantToJourneyPlanV2: action.payload
    };
  },
  /**
   * ==============================
   * GET JOURNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER V2
   * ==============================
   */
  [types.JOURNEY_PLAN_GET_REPORT_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanReport: true,
      dataGetJourneyPlanReportV2: null,
      errorGetJourneyPlanReportV2: null
    };
  },
  [types.JOURNEY_PLAN_GET_REPORT_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanReport: false,
      dataGetJourneyPlanReportV2: action.payload.data
    };
  },
  [types.JOURNEY_PLAN_GET_REPORT_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetJourneyPlanReport: false,
      errorGetJourneyPlanReportV2: action.payload
    };
  }
});
