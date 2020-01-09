import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetMerchant: false,
  loadingAddMerchant: false,
  refreshGetMerchant: false,
  loadingLoadMoreGetMerchant: false,
  loadingGetPortfolio: false,
  loadingGetMerchantDetail: false,
  loadingGetMerchantLastOrder: false,
  loadingCheckinMerchant: false,
  loadingCheckoutMerchant: false,
  loadingGetLogMerchant: false,
  /** data */
  selectedMerchant: null,
  dataGetMerchant: [],
  dataAddMerchant: null,
  dataGetMerchantDetail: null,
  dataGetMerchantLastOrder: null,
  dataAddMerchantVolatile: {
    name: '',
    taxNo: '',
    address: '',
    longitude: '',
    latitude: '',
    phoneNo: '',
    numberOfEmployee: '',
    largeArea: '',
    status: 'inactive',
    storeTypeId: '',
    storeTypeName: '',
    storeGroupId: '',
    storeGroupName: '',
    storeSegmentId: '',
    storeSegmentName: '',
    urbanId: '',
    user: {
      fullName: '',
      idNo: '',
      taxNo: '',
      phone: '',
      email: '',
      password: 'sinbad',
      status: 'inactive',
      roles: [1]
    },
    cluster: {
      clusterId: '',
      clusterName: ''
    },
    supplier: {
      supplierId: '',
      supplierName: ''
    }
  },
  totalDataGetMerchant: 0,
  pageGetMerchant: 0,
  dataGetPortfolio: null,
  dataCheckinMerchant: null,
  dataCheckoutMerchant: null,
  dataGetLogMerchant: null,
  /** error */
  errorGetMerchant: null,
  errorAddMerchant: null,
  errorGetPortfolio: null,
  errorGetMerchantDetail: null,
  errorGetMerchantLastOrder: null,
  errorCheckinMerchant: null,
  errorCheckoutMerchant: null,
  errorGetLogMerchant: null
};

export const merchant = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ============================
   * SELECTED MERCHANT
   * ============================
   */
  [types.MERCHANT_SELECTED](state, action) {
    return {
      ...state,
      selectedMerchant: action.payload
    };
  },
  /**
   * ==================================
   * SAVE VOLATILE DATA TO ADD MERCHANT
   * =================================
   */
  [types.MERCHANT_ADD_DATA_VOLATILE](state, action) {
    return {
      ...state,
      dataAddMerchantVolatile: {
        ...state.dataAddMerchantVolatile,
        ...action.payload
      }
    };
  },
  /**
   * ===================
   * MERCHANT LIST
   * ===================
   */
  [types.MERCHANT_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchant: action.payload.loading,
      errorGetMerchant: null
    };
  },
  [types.MERCHANT_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      totalDataGetMerchant: action.payload.total,
      dataGetMerchant: [...state.dataGetMerchant, ...action.payload.data]
    };
  },
  [types.MERCHANT_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      errorGetMerchant: action.payload
    };
  },
  [types.MERCHANT_GET_RESET](state, action) {
    return {
      ...state,
      pageGetMerchant: 0,
      totalDataGetMerchant: 0,
      dataGetMerchant: []
    };
  },
  [types.MERCHANT_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetMerchant: true,
      loadingGetMerchant: true,
      pageGetMerchant: 0,
      totalDataGetMerchant: 0,
      dataGetMerchant: []
    };
  },
  [types.MERCHANT_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetMerchant: true,
      pageGetMerchant: action.payload
    };
  },
  /**
   * ==========================
   * MERCHANT DETAIL
   * ==========================
   */
  [types.MERCHANT_GET_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: true,
      dataGetMerchantDetail: null,
      errorGetMerchantDetail: null
    };
  },
  [types.MERCHANT_GET_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: false,
      dataGetMerchantDetail: action.payload
    };
  },
  [types.MERCHANT_GET_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: false,
      errorGetMerchantDetail: action.payload
    };
  },
  /**
   * ==========================
   * PORTFOLIO LIST
   * ==========================
   */
  [types.PORTFOLIO_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetPortfolio: true,
      loadingGetMerchant: true,
      dataGetPortfolio: null,
      errorGetPortfolio: null
    };
  },
  [types.PORTFOLIO_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetPortfolio: false,
      loadingGetMerchant: false,
      dataGetPortfolio: action.payload
    };
  },
  [types.PORTFOLIO_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetPortfolio: false,
      loadingGetMerchant: false,
      errorGetPortfolio: action.payload
    };
  },
  /**
   * =============================
   * ADD MERCHANT
   * =============================
   */
  [types.MERCHANT_ADD_PROCESS](state, action) {
    return {
      ...state,
      loadingAddMerchant: true,
      dataAddMerchant: null,
      errorAddMerchant: null
    };
  },
  [types.MERCHANT_ADD_SUCCESS](state, action) {
    return {
      ...state,
      loadingAddMerchant: false,
      dataAddMerchant: action.payload,
      dataAddMerchantVolatile: INITIAL_STATE.dataAddMerchantVolatile
    };
  },
  [types.MERCHANT_ADD_FAILED](state, action) {
    return {
      ...state,
      loadingAddMerchant: false,
      errorAddMerchant: action.payload
    };
  },
  /**
   * ==========================
   * MERCHANT LAST ORDER
   * ==========================
   */
  [types.MERCHANT_GET_LAST_ORDER_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantLastOrder: true,
      dataGetMerchantLastOrder: null,
      errorGetMerchantLastOrder: null
    };
  },
  [types.MERCHANT_GET_LAST_ORDER_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantLastOrder: false,
      dataGetMerchantLastOrder: action.payload.lastOrder
    };
  },
  [types.MERCHANT_GET_LAST_ORDER_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchantLastOrder: false,
      errorGetMerchantLastOrder: action.payload
    };
  },
  /**
   * =============================
   * CHECKIN MERCHANT
   * =============================
   */
  [types.MERCHANT_CHECKIN_PROCESS](state, action) {
    return {
      ...state,
      loadingCheckinMerchant: true,
      dataCheckinMerchant: null,
      errorCheckinMerchant: null
    };
  },
  [types.MERCHANT_CHECKIN_SUCCESS](state, action) {
    return {
      ...state,
      loadingCheckinMerchant: false,
      dataCheckinMerchant: action.payload
    };
  },
  [types.MERCHANT_CHECKIN_FAILED](state, action) {
    return {
      ...state,
      loadingCheckinMerchant: false,
      errorCheckinMerchant: action.payload
    };
  },
  /**
   * =============================
   * CHECKOUT MERCHANT
   * =============================
   */
  [types.MERCHANT_CHECKOUT_PROCESS](state, action) {
    return {
      ...state,
      loadingCheckoutMerchant: true,
      dataCheckoutMerchant: null,
      errorCheckoutMerchant: null
    };
  },
  [types.MERCHANT_CHECKOUT_SUCCESS](state, action) {
    return {
      ...state,
      loadingCheckoutMerchant: false,
      dataCheckoutMerchant: action.payload
    };
  },
  [types.MERCHANT_CHECKOUT_FAILED](state, action) {
    return {
      ...state,
      loadingCheckoutMerchant: false,
      errorCheckoutMerchant: action.payload
    };
  },
  /**
   * =============================
   * GET LOG MERCHANT
   * =============================
   */
  [types.MERCHANT_GET_LOG_PROCESS](state, action) {
    return {
      ...state,
      loadingGetLogMerchant: true,
      dataGetLogMerchant: null,
      errorGetLogMerchant: null
    };
  },
  [types.MERCHANT_GET_LOG_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetLogMerchant: false,
      dataGetLogMerchant: action.payload
    };
  },
  [types.MERCHANT_GET_LOG_FAILED](state, action) {
    return {
      ...state,
      loadingGetLogMerchant: false,
      errorGetLogMerchant: action.payload
    };
  }
});
