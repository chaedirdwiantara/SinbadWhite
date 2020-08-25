import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetHistory: false,
  loadingEditHistory: false,
  loadingDetailHistory: false,
  refreshGetHistory: false,
  loadingLoadMoreGetHistory: false,
  loadingGetOrderStatus: false,
  loadingGetPaymentStatus: false,
  loadingHistoryActivateVA: false,
  /** data */
  dataGetHistory: [],
  dataEditHistory: null,
  dataGetOrderStatus: null,
  dataGetPaymentStatus: null,
  dataDetailHistory: null,
  dataHistoryActivateVA: null,
  totalDataGetHistory: 0,
  pageGetHistory: 0,
  /** error */
  errorGetHistory: null,
  errorGetOrderStatus: null,
  errorGetPaymentStatus: null,
  errorEditHistory: null,
  errorHistoryDetail: null,
  errorHistoryActivateVA: null
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
  [types.HISTORY_GET_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingDetailHistory: true,
      dataDetailHistory: null,
      errorHistoryDetail: null
    };
  },
  [types.HISTORY_GET_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingDetailHistory: false,
      dataDetailHistory: action.payload.data
    };
  },
  [types.HISTORY_GET_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingDetailHistory: false,
      errorHistoryDetail: action.payload
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
      dataGetHistory: removeDuplicateData(
        state.dataGetHistory,
        action.payload.data
      )
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
  },

   /**
   * ==================================
   * ACTIVATE VA
   * =================================
   */
  [types.HISTORY_ACTIVATE_VA_PROCESS](state, action) {
    return {
      ...state,
      loadingHistoryActivateVA: true,
      dataHistoryActivateVA: null,
      errorHistoryActivateVA: null
    };
  },
  [types.HISTORY_ACTIVATE_VA_SUCCESS](state, action) {
    let dataDetailHistory = { ...state.dataDetailHistory };
    dataDetailHistory.billing.accountVaNo = action.payload.data.accountVaNo;
    dataDetailHistory.billing.accountVaType = action.payload.data.accountVaType;
    dataDetailHistory.billing.expiredPaymentTime =
      action.payload.data.expiredPaymentTime;
    return {
      ...state,
      loadingHistoryActivateVA: false,
      dataHistoryActivateVA: action.payload,
      dataDetailHistory
    };
  },
  [types.HISTORY_ACTIVATE_VA_FAILED](state, action) {
    return {
      ...state,
      loadingHistoryActivateVA: false,
      errorHistoryActivateVA: action.payload
    };
  },

  /**
   * =============================
   * EDIT HISTORY
   * =============================
   */
  [types.HISTORY_EDIT_PROCESS](state, action) {
    return {
      ...state,
      loadingEditHistory: true,
      dataEditHistory: null,
      errorEditHistory: null
    };
  },
  [types.HISTORY_EDIT_SUCCESS](state, action) {
    return {
      ...state,
      loadingEditHistory: false,
      dataEditHistory: action.payload
    };
  },
  [types.HISTORY_EDIT_FAILED](state, action) {
    return {
      ...state,
      loadingEditHistory: false,
      errorEditHistory: action.payload
    };
  }
});

/**
 * ======================
 * FUNCTION SERVICE
 * ======================
 */
function removeDuplicateData(existingData, newData) {
  let dataArray = [...existingData, ...newData];
  return dataArray
    .map(data => data.id)
    .map((data, index, fixData) => fixData.indexOf(data) === index && index)
    .filter(data => dataArray[data])
    .map(data => dataArray[data]);
}
