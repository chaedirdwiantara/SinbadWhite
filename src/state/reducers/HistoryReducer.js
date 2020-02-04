import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetHistory: false,
  refreshGetHistory: false,
  loadingLoadMoreGetHistory: false,
  loadingGetOrderStatus: false,
  loadingGetPaymentStatus: false,
  /** data */
  dataGetHistory: [],
  dataGetOrderStatus: null,
  dataGetPaymentStatus: null,
  dataDetailHistory: null,
  totalDataGetHistory: 0,
  pageGetHistory: 0,
  /** error */
  errorGetHistory: null,
  errorGetOrderStatus: null,
  errorGetPaymentStatus: null
};

export const history = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ==================================
   * HISTORY DETAILS
   * ==================================
   */
  [types.HISTORY_DETAIL](state, action) {
    return {
      ...state,
      dataDetailHistory: action.payload
    };
  },
  /**
   * ==========================
   * GET PAYMENT STATUS
   * ==========================
   */
  [types.HISTORY_GET_PAYMENT_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetPaymentStatus: true,
      dataGetPaymentStatus: null,
      errorGetPaymentStatus: null
    };
  },
  [types.HISTORY_GET_PAYMENT_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetPaymentStatus: false,
      dataGetPaymentStatus: action.payload
    };
  },
  [types.HISTORY_GET_PAYMENT_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingGetPaymentStatus: false,
      errorGetPaymentStatus: action.payload
    };
  },
  /**
   * ==========================
   * GET ORDER STATUS
   * ==========================
   */
  [types.HISTORY_GET_ORDER_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetOrderStatus: true,
      dataGetOrderStatus: null,
      errorGetOrderStatus: null
    };
  },
  [types.HISTORY_GET_ORDER_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetOrderStatus: false,
      dataGetOrderStatus: action.payload
    };
  },
  [types.HISTORY_GET_ORDER_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingGetOrderStatus: false,
      errorGetOrderStatus: action.payload
    };
  },
  /**
   * ===================
   * HISTORY LIST
   * ===================
   */
  [types.HISTORY_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetHistory: action.payload.loading,
      errorGetHistory: null
    };
  },
  [types.HISTORY_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetHistory: false,
      loadingLoadMoreGetHistory: false,
      refreshGetHistory: false,
      totalDataGetHistory: action.payload.total,
      dataGetHistory: [...state.dataGetHistory, ...action.payload.data]
    };
  },
  [types.HISTORY_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetHistory: false,
      loadingLoadMoreGetHistory: false,
      refreshGetHistory: false,
      errorGetHistory: action.payload
    };
  },
  [types.HISTORY_GET_RESET](state, action) {
    return {
      ...state,
      pageGetHistory: 0,
      totalDataGetHistory: 0,
      dataGetHistory: []
    };
  },
  [types.HISTORY_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetHistory: true,
      loadingGetHistory: true,
      pageGetHistory: 0,
      totalDataGetHistory: 0,
      dataGetHistory: []
    };
  },
  [types.HISTORY_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetHistory: true,
      pageGetHistory: action.payload
    };
  }
});
