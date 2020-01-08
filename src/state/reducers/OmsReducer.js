import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingOmsGetCartItem: false,
  /** data */
  dataOmsGetCartItem: null,
  dataCart: [],
  dataCheckBoxlistCart: [],
  /** error */
  errorOmsGetCartItem: null
};

export const oms = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * GET CART LIST
   * =================================
   */
  [types.OMS_GET_CART_ITEM_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetCartItem: true,
      dataOmsGetCartItem: null,
      errorOmsGetCartItem: null
    };
  },
  [types.OMS_GET_CART_ITEM_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetCartItem: false,
      dataOmsGetCartItem: action.payload
    };
  },
  [types.OMS_GET_CART_ITEM_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetCartItem: false,
      errorOmsGetCartItem: action.payload
    };
  },
  // SEMENTARA
  /**
   * ==================================
   * ADD TO CART
   * ==================================
   */
  [types.OMS_ITEM_FOR_CART](state, action) {
    return {
      ...state,
      dataCart: action.payload
    };
  }
});
