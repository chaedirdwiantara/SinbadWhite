import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetHistory: false,
  loadingEditHistory: false,
  loadingDetailHistory: false,
  refreshGetHistory: false,
  refreshGetReturnParcels: false,
  loadingLoadMoreGetHistory: false,
  loadingGetOrderStatus: false,
  loadingGetPaymentStatus: false,
  loadingHistoryActivateVA: false,
  loadingHistoryChangePaymentMethod: false,
  loadingViewInvoice: false,
  loadingGetReturnStatus: false,
  loadingGetReturnParcels: false,
  loadingLoadMoreGetReturnParcels: false,
  /** data */
  dataGetHistory: [],
  dataEditHistory: null,
  dataGetOrderStatus: null,
  dataGetPaymentStatus: null,
  dataDetailHistory: null,
  dataHistoryActivateVA: null,
  dataHistoryChangePaymentMethod: null,
  totalDataGetHistory: 0,
  pageGetHistory: 0,
  dataViewInvoice: null,
  dataGetReturnStatus: null,
  dataGetReturnParcels: [],
  totalGetReturnParcels: 0,
  pageGetReturnParcels: 0,
  /** error */
  errorGetHistory: null,
  errorGetOrderStatus: null,
  errorGetPaymentStatus: null,
  errorEditHistory: null,
  errorHistoryDetail: null,
  errorHistoryActivateVA: null,
  errorHistoryChangePaymentMethod: null,
  errorViewInvoice: null,
  errorGetReturnStatus: null,
  errorGetReturnParcels: null
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
      errorHistoryActivateVA: action.payload,
      errorHistoryDetail: action.payload
    };
  },
  /**
   * ==================================
   * CHANGE PAYMENT METHOD
   * =================================
   */
  [types.HISTORY_CHANGE_PAYMENT_METHOD_PROCESS](state, action) {
    return {
      ...state,
      loadingHistoryChangePaymentMethod: true,
      dataHistoryChangePaymentMethod: null,
      errorHistoryChangePaymentMethod: null
    };
  },
  [types.HISTORY_CHANGE_PAYMENT_METHOD_SUCCESS](state, action) {
    let dataDetailHistory = { ...state.dataDetailHistory };
    dataDetailHistory.billing.paymentChannelId =
      action.payload.data.paymentChannelId;
    dataDetailHistory.billing.paymentTypeId = action.payload.data.paymentTypeId;
    dataDetailHistory.paymentType.id = action.payload.data.paymentTypeId;
    dataDetailHistory.paymentChannel.id = action.payload.data.paymentChannelId;
    dataDetailHistory.paymentChannel.name =
      action.payload.data.paymentChannelName;
    dataDetailHistory.paymentChannel.description =
      action.payload.data.paymentDescription;
    dataDetailHistory.billing.accountVaNo = action.payload.data.accountVaNo;
    dataDetailHistory.billing.expiredPaymentTime =
      action.payload.data.expiredPaymentTime;
    dataDetailHistory.paymentChannel.iconUrl =
      action.payload.data.paymentIconUrl;
    dataDetailHistory.billing.totalPayment = action.payload.data.totalPayment;
    dataDetailHistory.paymentChannel.paymentChannelTypeId =
      action.payload.data.paymentChannelTypeId;
    return {
      ...state,
      loadingHistoryChangePaymentMethod: false,
      dataHistoryChangePaymentMethod: action.payload,
      dataDetailHistory
    };
  },
  [types.HISTORY_CHANGE_PAYMENT_METHOD_FAILED](state, action) {
    return {
      ...state,
      loadingHistoryChangePaymentMethod: false,
      errorHistoryChangePaymentMethod: action.payload,
      errorHistoryDetail: action.payload
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
      errorEditHistory: action.payload,
      errorHistoryDetail: action.payload
    };
  },

  /**
   * =============================
   * HISTORY INVOICE
   * =============================
   */
  [types.HISTORY_VIEW_INVOICE_PROCESS](state, action) {
    return {
      ...state,
      loadingViewInvoice: true,
      dataViewInvoice: null,
      errorViewInvoice: null
    };
  },
  [types.HISTORY_VIEW_INVOICE_SUCCESS](state, action) {
    return {
      ...state,
      loadingViewInvoice: false,
      dataViewInvoice: action.payload
    };
  },
  [types.HISTORY_VIEW_INVOICE_FAILED](state, action) {
    return {
      ...state,
      loadingViewInvoice: false,
      errorViewInvoice: action.payload,
      errorHistoryDetail: action.payload
    };
  },

  /**
   * ==========================
   * GET RETURN STATUS
   * ==========================
   */
  [types.GET_RETURN_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetReturnStatus: true,
      dataGetReturnStatus: null,
      errorGetReturnStatus: null
    };
  },
  [types.GET_RETURN_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetReturnStatus: false,
      dataGetReturnStatus: action.payload.data
    };
  },
  [types.GET_RETURN_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingGetReturnStatus: false,
      errorGetReturnStatus: action.payload
    };
  },

  /**
   * =========================
   * GET RETURN PARCELS
   * =========================
   */
  [types.GET_RETURN_PARCELS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetReturnParcels: true,
      errorGetReturnParcels: null
    };
  },
  [types.GET_RETURN_PARCELS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetReturnParcels: false,
      loadingLoadMoreGetReturnParcels: false,
      refreshGetReturnParcels: false,
      totalGetReturnParcels: action.payload.data.total,
      dataGetReturnParcels: removeDuplicateData(
        state.dataGetReturnParcels,
        action.payload.data.data
      )
    };
  },
  [types.GET_RETURN_PARCELS_FAILED](state, action) {
    return {
      ...state,
      loadingGetReturnParcels: false,
      loadingLoadMoreGetReturnParcels: false,
      refreshGetReturnParcels: false,
      errorGetReturnParcels: action.payload
    };
  },
  [types.GET_RETURN_PARCELS_RESET](state, action) {
    return {
      ...state,
      pageGetReturnParcels: 0,
      totalGetReturnParcels: 0,
      dataGetReturnParcels: []
    };
  },
  [types.HISTORY_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetReturnParcels: true,
      loadingGetReturnParcels: true,
      pageGetReturnParcels: 0,
      totalGetReturnParcels: 0,
      dataGetReturnParcels: []
    };
  },
  [types.HISTORY_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetReturnParcels: true,
      pageGetReturnParcels: action.payload
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
