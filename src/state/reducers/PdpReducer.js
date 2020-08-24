import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetPdp: false,
  refreshGetPdp: false,
  loadingDetailPdp: false,
  loadingLoadMoreGetPdp: false,
  loadingGetSearchPdp: false,
  refreshGetSearchPdp: false,
  loadingLoadMoreGetSearchPdp: false,
  /** data */
  dataGetPdp: [],
  totalDataGetPdp: 0,
  pageGetPdp: 0,
  dataGetSearchPdp: [],
  totalDataGetSearchPdp: 0,
  pageGetSearchPdp: 0,
  pdpDisplay: 'grid',
  pdpOpenModalOrder: false,
  pdpOrderData: null,
  dataDetailPdp: null,
  /** error */
  errorGetPdp: null,
  errorGetSearchPdp: null,
  errorDetailPdp: null
};

export const pdp = createReducer(INITIAL_STATE, {
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
   * PDP DETAILS
   * ==================================
   */
  [types.PDP_GET_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingDetailPdp: true,
      dataDetailPdp: null,
      errorDetailPdp: null
    };
  },
  [types.PDP_GET_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingDetailPdp: false,
      dataDetailPdp: action.payload
    };
  },
  [types.PDP_GET_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingDetailPdp: false,
      errorDetailPdp: action.payload
    };
  },
  /**
   * ===================
   * PDP LIST
   * ===================
   */
  [types.PDP_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetPdp: action.payload.loading,
      errorGetPdp: null
    };
  },
  [types.PDP_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetPdp: false,
      loadingLoadMoreGetPdp: false,
      refreshGetPdp: false,
      totalDataGetPdp: action.payload.total,
      dataGetPdp: [...state.dataGetPdp, ...action.payload.data]
    };
  },
  [types.PDP_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetPdp: false,
      loadingLoadMoreGetPdp: false,
      refreshGetPdp: false,
      errorGetPdp: action.payload
    };
  },
  [types.PDP_GET_RESET](state, action) {
    return {
      ...state,
      pageGetPdp: 0,
      totalDataGetPdp: 0,
      dataGetPdp: []
    };
  },
  [types.PDP_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetPdp: true,
      loadingGetPdp: true,
      pageGetPdp: 0,
      totalDataGetPdp: 0,
      dataGetPdp: []
    };
  },
  [types.PDP_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetPdp: true,
      pageGetPdp: action.payload
    };
  },
  /**
   * ===================
   * PDP SEARCH LIST
   * ===================
   */
  [types.PDP_SEARCH_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetSearchPdp: action.payload.loading,
      errorGetSearchPdp: null
    };
  },
  [types.PDP_SEARCH_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetSearchPdp: false,
      loadingLoadMoreGetSearchPdp: false,
      refreshGetSearchPdp: false,
      totalDataGetSearchPdp: action.payload.total,
      dataGetSearchPdp: [...state.dataGetSearchPdp, ...action.payload.data]
    };
  },
  [types.PDP_SEARCH_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetSearchPdp: false,
      loadingLoadMoreGetSearchPdp: false,
      refreshGetSearchPdp: false,
      errorGetSearchPdp: action.payload
    };
  },
  [types.PDP_SEARCH_GET_RESET](state, action) {
    return {
      ...state,
      pageGetSearchPdp: 0,
      totalDataGetSearchPdp: 0,
      dataGetSearchPdp: []
    };
  },
  [types.PDP_SEARCH_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetSearchPdp: true,
      loadingGetSearchPdp: true,
      pageGetSearchPdp: 0,
      totalDataGetSearchPdp: 0,
      dataGetSearchPdp: []
    };
  },
  [types.PDP_SEARCH_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetSearchPdp: true,
      pageGetSearchPdp: action.payload
    };
  },
  /**
   * ===================
   * FILTER & DISPLAY PDP
   * ===================
   */
  [types.PDP_CHANGE_DISPLAY](state, action) {
    return {
      ...state,
      pdpDisplay: action.payload
    };
  },

  //SEMENTARA
  /**
   * ===================
   * OPEN ORDER PDP
   * ===================
   */
  [types.PDP_OPEN_ORDER](state, action) {
    return {
      ...state,
      pdpOpenModalOrder: true,
      pdpOrderData: action.payload
    };
  },
  [types.PDP_CLOSE_ORDER](state, action) {
    return {
      ...state,
      pdpOpenModalOrder: false,
      pdpOrderData: null
    };
  },
  /**
   * ===================
   * ADD TO CART PDP
   * ===================
   */
  [types.PDP_MODIFY_PRODUCT_LIST_DATA](state, action) {
    return {
      ...state,
      pdpOpenModalOrder: false
    };
  }
});
