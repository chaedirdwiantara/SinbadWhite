import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetLocation: false,
  refreshGetLocation: false,
  loadingLoadMoreGetLocation: false,
  loadingGlobalLongLatToAddress: false,
  /** data */
  search: '',
  pageAddMerchantFrom: '',
  dataGetLocation: [],
  totalDataGetLocation: 0,
  pageGetLocation: 0,
  dataGlobalLongLatToAddress: null,
  /** error */
  errorGetLocation: null,
  errorGlobalLongLatToAddress: null
};

export const global = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   * - token
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ===================
   * TOKEN
   * ===================
   */
  [types.SIGN_IN_SUCCESS](state, action) {
    return {
      ...state,
      token: action.payload.token
    };
  },
  /**
   * ==================================
   * SAVE PAGE THAT ADD MERCHANT BEGIN
   * ==================================
   */
  [types.SAVE_PAGE_ADD_MERCHANT_FROM](state, action) {
    return {
      ...state,
      pageAddMerchantFrom: action.payload
    };
  },
  /**
   * ======================
   * SEARCH TEXT
   * ======================
   */
  [types.SEARCH_TEXT](state, action) {
    return {
      ...state,
      search: action.payload
    };
  },
  /**
   * ============================
   * SAVE LOCATION DATA VOLATILE
   * ============================
   */
  [types.LOCATION_SAVE_DATA_VOLATILE](state, action) {
    return {
      ...state,
      dataLocationVolatile: { ...state.dataLocationVolatile, ...action.payload }
    };
  },
  /**
   * ===================
   * LOCATION LIST
   * ===================
   */
  [types.LOCATION_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetLocation: action.payload.loading,
      errorGetLocation: null
    };
  },
  [types.LOCATION_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetLocation: false,
      loadingLoadMoreGetLocation: false,
      refreshGetLocation: false,
      totalDataGetLocation: action.payload.total,
      dataGetLocation: [...state.dataGetLocation, ...action.payload.data]
    };
  },
  [types.LOCATION_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetLocation: false,
      loadingLoadMoreGetLocation: false,
      refreshGetLocation: false,
      errorGetLocation: action.payload
    };
  },
  [types.LOCATION_GET_RESET](state, action) {
    return {
      ...state,
      pageGetLocation: 0,
      totalDataGetLocation: 0,
      dataGetLocation: []
    };
  },
  [types.LOCATION_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetLocation: true,
      loadingGetLocation: true,
      pageGetLocation: 0,
      totalDataGetLocation: 0,
      dataGetLocation: []
    };
  },
  [types.LOCATION_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetLocation: true,
      pageGetLocation: action.payload
    };
  },
  /**
   * ============================
   * FOR CLEAR DATA REDUCER
   * ============================
   */
  /** IF ADD MERCHANT SUCCESS CLEAR LOCATION */
  [types.MERCHANT_ADD_SUCCESS](state, action) {
    return {
      ...state,
      dataLocationVolatile: INITIAL_STATE.dataLocationVolatile
    };
  },
  /**
   * ================================================
   * THIS FOR GET ADDRESS FROM LONG LAT GOOGLE MAPS
   * ================================================
   */
  [types.GLOBAL_LONGLAT_TO_ADDRESS_PROCESS](state, action) {
    return {
      ...state,
      loadingGlobalLongLatToAddress: true,
      dataGlobalLongLatToAddress: null,
      errorGlobalLongLatToAddress: null
    };
  },
  [types.GLOBAL_LONGLAT_TO_ADDRESS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGlobalLongLatToAddress: false,
      dataGlobalLongLatToAddress: {
        province: action.payload.province,
        city: action.payload.city,
        district: action.payload.district,
        urban: action.payload.urban
      }
    };
  },
  [types.GLOBAL_LONGLAT_TO_ADDRESS_FAILED](state, action) {
    return {
      ...state,
      loadingGlobalLongLatToAddress: false,
      errorGlobalLongLatToAddress: action.payload
    };
  }
});
