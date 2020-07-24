import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingOmsGetCartItem: false,
  loadingOmsGetCheckoutItem: false,
  loadingOmsConfirmOrder: false,
  loadingOmsGetPayment: false,
  loadingOmsDeleteCartItem: false,
  loadingOmsGetCartItemFromCheckout: false,
  loadingOmsGetPaymentChannel: false,
  /** data */
  dataOmsGetCartItem: null,
  dataOmsGetCartItemFromCheckout: null,
  dataOmsGetCheckoutItem: null,
  dataOmsConfirmOrder: null,
  dataOmsGetPayment: null,
  dataOmsDeleteCartItem: null,
  dataCart: [],
  dataCheckout: [],
  dataCheckBoxlistCart: [],
  dataOmsGetPaymentChannel: null,
  /** error */
  errorOmsGetCartItem: null,
  errorOmsGetCheckoutItem: null,
  errorOmsConfirmOrder: null,
  errorOmsGetPayment: null,
  errorOmsDeleteCartItem: null,
  errorOmsGetCartItemFromCheckout: null,
  errorOmsGetPaymentChannel: null,
};

export const oms = createReducer(INITIAL_STATE, {
  /**
   * ================================
   * WARNING, THIS TYPE FOR DELETE ALL DATA
   * ================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return {
      /** loading */
      loadingOmsGetCartItem: false,
      loadingOmsGetCheckoutItem: false,
      loadingOmsConfirmOrder: false,
      loadingOmsGetPayment: false,
      loadingOmsDeleteCartItem: false,
      loadingOmsGetCartItemFromCheckout: false,
      loadingOmsGetPaymentChannel: false,
      /** data */
      dataOmsGetCartItem: null,
      dataOmsGetCartItemFromCheckout: null,
      dataOmsGetCheckoutItem: null,
      dataOmsConfirmOrder: null,
      dataOmsGetPayment: null,
      dataOmsDeleteCartItem: null,
      dataCart: [],
      dataCheckout: [],
      dataCheckBoxlistCart: [],
      dataOmsGetPaymentChannel: null,
      /** error */
      errorOmsGetCartItem: null,
      errorOmsGetCheckoutItem: null,
      errorOmsConfirmOrder: null,
      errorOmsGetPayment: null,
      errorOmsDeleteCartItem: null,
      errorOmsGetCartItemFromCheckout: null,
      errorOmsGetPaymentChannel: null
    };
  },
  [types.OMS_RESET_DATA](state, action) {
    return {
      /** loading */
      loadingOmsGetCartItem: false,
      loadingOmsGetCheckoutItem: false,
      loadingOmsConfirmOrder: false,
      loadingOmsGetPayment: false,
      loadingOmsDeleteCartItem: false,
      loadingOmsGetCartItemFromCheckout: false,
      /** data */
      dataOmsGetCartItem: null,
      dataOmsGetCartItemFromCheckout: null,
      dataOmsGetCheckoutItem: null,
      dataOmsConfirmOrder: null,
      dataOmsGetPayment: null,
      dataOmsDeleteCartItem: null,
      dataCart: [],
      dataCheckout: [],
      dataCheckBoxlistCart: [],
      /** error */
      errorOmsGetCartItem: null,
      errorOmsGetCheckoutItem: null,
      errorOmsConfirmOrder: null,
      errorOmsGetPayment: null,
      errorOmsDeleteCartItem: null,
      errorOmsGetCartItemFromCheckout: null
    };
  },
  /**
   * =================================
   * ADD CHECKOUT ITEM
   * =================================
   */
  [types.OMS_CHECKOUT_ITEM](state, action) {
    return {
      ...state,
      dataCheckout: action.payload
    };
  },
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
  /**
   * ==================================
   * GET PAYMENT CHANNEL
   * =================================
   */
  [types.OMS_GET_PAYMENT_CHANNEL_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetPaymentChannel: true,
      dataOmsGetPaymentChannel: null,
      errorOmsGetPaymentChannel: null
    };
  },
  [types.OMS_GET_PAYMENT_CHANNEL_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetPaymentChannel: false,
      dataOmsGetPaymentChannel: action.payload
    };
  },
  [types.OMS_GET_PAYMENT_CHANNEL_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetPaymentChannel: false,
      errorOmsGetPaymentChannel: action.payload
    };
  },
  /**
   * ==================================
   * GET CART LIST FROM CHECKOUT
   * =================================
   */
  [types.OMS_GET_CART_ITEM_FROM_CHECKOUT_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetCartItemFromCheckout: true,
      dataOmsGetCartItemFromCheckout: null,
      errorOmsGetCartItemFromCheckout: null
    };
  },
  [types.OMS_GET_CART_ITEM_FROM_CHECKOUT_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetCartItemFromCheckout: false,
      dataOmsGetCartItemFromCheckout: action.payload
    };
  },
  [types.OMS_GET_CART_ITEM_FROM_CHECKOUT_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetCartItemFromCheckout: false,
      errorOmsGetCartItemFromCheckout: action.payload
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
  },
  [types.OMS_CHECKLIST_ITEM_CART](state, action) {
    return {
      ...state,
      dataCheckBoxlistCart: action.payload
    };
  }
});
