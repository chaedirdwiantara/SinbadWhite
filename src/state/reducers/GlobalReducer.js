import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetLocation: false,
  refreshGetLocation: false,
  loadingLoadMoreGetLocation: false,
  /** data */
  search: '',
  dataGetLocation: [],
  totalDataGetLocation: 0,
  pageGetLocation: 0,
  dataLocationVolatile: {
    provinceName: '',
    provinceId: '',
    cityName: '',
    districName: '',
    urbanName: '',
    urbanId: '',
    zipCode: '',
    address: '',
    latitude: '',
    longitude: ''
  },
  /** error */
  errorGetLocation: null
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
  }
});
