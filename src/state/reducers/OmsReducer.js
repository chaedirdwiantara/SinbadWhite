import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingOmsGetCartItem: false,
  loadingOmsGetCheckoutItem: false,
  loadingOmsConfirmOrder: false,
  loadingOmsGetPayment: false,
  loadingOmsDeleteCartItem: false,
  /** data */
  dataOmsGetCartItem: null,
  dataOmsGetCheckoutItem: null,
  dataOmsConfirmOrder: null,
  dataOmsGetPayment: null,
  dataOmsDeleteCartItem: null,
  dataCart: [],
  dataCheckBoxlistCart: [],
  /** error */
  errorOmsGetCartItem: null,
  errorOmsGetCheckoutItem: null,
  errorOmsConfirmOrder: null,
  errorOmsGetPayment: null,
  errorOmsDeleteCartItem: null
};

export const oms = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * GET PAYMENT
   * =================================
   */
  [types.OMS_GET_PAYMENT_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetPayment: true,
      dataOmsGetPayment: null,
      errorOmsGetPayment: null
    };
  },
  [types.OMS_GET_PAYMENT_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetPayment: false,
      dataOmsGetPayment: action.payload
    };
  },
  [types.OMS_GET_PAYMENT_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetPayment: false,
      errorOmsGetPayment: action.payload
    };
  },
  /**
   * ==================================
   * CONFIRM ORDER
   * =================================
   */
  [types.OMS_CONFIRM_ORDER_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsConfirmOrder: true,
      dataOmsConfirmOrder: null,
      errorOmsConfirmOrder: null
    };
  },
  [types.OMS_CONFIRM_ORDER_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsConfirmOrder: false,
      dataOmsConfirmOrder: action.payload
    };
  },
  [types.OMS_CONFIRM_ORDER_FAILED](state, action) {
    return {
      ...state,
      loadingOmsConfirmOrder: false,
      errorOmsConfirmOrder: action.payload
    };
  },
  /**
   * ==================================
   * DELETE CART
   * =================================
   */
  [types.OMS_DELETE_CART_ITEM_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsDeleteCartItem: true,
      dataOmsDeleteCartItem: null,
      errorOmsDeleteCartItem: null
    };
  },
  [types.OMS_DELETE_CART_ITEM_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsDeleteCartItem: false,
      dataOmsDeleteCartItem: action.payload
    };
  },
  [types.OMS_DELETE_CART_ITEM_FAILED](state, action) {
    return {
      ...state,
      loadingOmsDeleteCartItem: false,
      errorOmsDeleteCartItem: action.payload
    };
  },
  /**
   * ==================================
   * GET CHECKOUT LIST
   * =================================
   */
  [types.OMS_GET_CHECKOUT_ITEM_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetCheckoutItem: true,
      dataOmsGetCheckoutItem: null,
      errorOmsGetCheckoutItem: null
    };
  },
  [types.OMS_GET_CHECKOUT_ITEM_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetCheckoutItem: false,
      dataOmsGetCheckoutItem: action.payload
    };
  },
  [types.OMS_GET_CHECKOUT_ITEM_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetCheckoutItem: false,
      errorOmsGetCheckoutItem: action.payload
    };
  },
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
