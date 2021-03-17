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
  loadingOmsCheckPromo: false,
  loadingOmsGetPayLaterType: false,
  loadingOmsApplicablePaylater: false,
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
  dataOmsCheckPromo: null,
  dataOmsGetPayLaterType: null,
  /** error */
  errorOmsGetCartItem: null,
  errorOmsGetCheckoutItem: null,
  errorOmsConfirmOrder: null,
  errorOmsGetPayment: null,
  errorOmsDeleteCartItem: null,
  errorOmsGetCartItemFromCheckout: null,
  errorOmsGetPaymentChannel: null,
  errorOmsCheckPromo: null,
  errorOmsGetPayLaterType: null,
  errorOmsApplicablePaylater: null
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
      loadingOmsCheckPromo: false,
      loadingOmsGetPayLaterType: false,
      loadingOmsGetKurOtp: false,
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
      dataOmsCheckPromo: null,
      dataOmsGetPayLaterType: null,
      dataOmsApplicablePaylater: null,
      dataOmsGetKurOtp: null,
      /** error */
      errorOmsGetCartItem: null,
      errorOmsGetCheckoutItem: null,
      errorOmsConfirmOrder: null,
      errorOmsGetPayment: null,
      errorOmsDeleteCartItem: null,
      errorOmsGetCartItemFromCheckout: null,
      errorOmsGetPaymentChannel: null,
      errorOmsCheckPromo: null,
      errorOmsGetPayLaterType: null,
      errorOmsGetKurOtp: null
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
      loadingOmsCheckPromo: false,
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
      dataOmsCheckPromo: null,
      /** error */
      errorOmsGetCartItem: null,
      errorOmsGetCheckoutItem: null,
      errorOmsConfirmOrder: null,
      errorOmsGetPayment: null,
      errorOmsDeleteCartItem: null,
      errorOmsGetCartItemFromCheckout: null,
      errorOmsCheckPromo: null
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
    const updatedState = {
      ...state,
      loadingOmsGetCheckoutItem: false,
      errorOmsGetCheckoutItem: action.payload
    };
    // if the error is promo, then update the dataCheckPromo
    if (action.payload.data.errorCode === 'ERR-PROMO') {
      return {
        ...updatedState,
        dataOmsCheckPromo: action.payload.data.data
      };
    } else {
      return updatedState;
    }
  },
  [types.OMS_REPLACE_CHECKOUT_ITEM](state, action) {
    return {
      ...state,
      dataOmsGetCheckoutItem: action.payload
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
   * GET TERMS AND CONDITIONS
   * =================================
   */
  [types.OMS_GET_TERMS_CONDITIONS_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetTermsConditions: true,
      dataOmsGetTermsConditions: null,
      errorOmsGetTermsConditions: null
    };
  },
  [types.OMS_GET_TERMS_CONDITIONS_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetTermsConditions: false,
      dataOmsGetTermsConditions: action.payload
    };
  },
  [types.OMS_GET_TERMS_CONDITIONS_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetTermsConditions: false,
      errorOmsGetTermsConditions: action.payload
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
  /**
   * ==================================
   * GET LAST PAYMENT CHANNEL
   * =================================
   */
  [types.OMS_GET_LAST_PAYMENT_CHANNEL_PROCESS](state, action) {
    return {
      ...state,
      loadingLastPaymentChannel: true,
      dataLastPaymentChannel: null,
      errorLastPaymentChannel: null
    };
  },
  [types.OMS_GET_LAST_PAYMENT_CHANNEL_SUCCESS](state, action) {
    return {
      ...state,
      loadingLastPaymentChannel: false,
      dataLastPaymentChannel: action.payload
    };
  },
  [types.OMS_GET_LAST_PAYMENT_CHANNEL_FAILED](state, action) {
    return {
      ...state,
      loadingLastPaymentChannel: false,
      errorLastPaymentChannel: action.payload
    };
  },
  [types.OMS_GET_LAST_PAYMENT_CHANNEL](state, action) {
    return {
      ...state,
      dataLastPaymentChannel: action.payload
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
  },

  /**
   * ==================================
   * CHECK PROMO
   * =================================
   */
  [types.OMS_CHECK_PROMO_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsCheckPromo: true,
      dataOmsCheckPromo: null,
      errorOmsCheckPromo: null
    };
  },
  [types.OMS_CHECK_PROMO_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsCheckPromo: false,
      dataOmsCheckPromo: action.payload
    };
  },
  [types.OMS_CHECK_PROMO_FAILED](state, action) {
    return {
      ...state,
      loadingOmsCheckPromo: false,
      errorOmsCheckPromo: action.payload
    };
  },

  /**
   * ==================================
   * GET PAY LATER TYPE
   * =================================
   */
  [types.OMS_GET_PAY_LATER_TYPE_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsGetPayLaterType: true,
      dataOmsGetPayLaterType: null,
      errorOmsGetPayLaterType: null
    };
  },
  [types.OMS_GET_PAY_LATER_TYPE_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsGetPayLaterType: false,
      dataOmsGetPayLaterType: action.payload
    };
  },
  [types.OMS_GET_PAY_LATER_TYPE_FAILED](state, action) {
    return {
      ...state,
      loadingOmsGetPayLaterType: false,
      errorOmsGetPayLaterType: action.payload
    };
  },

  /**
   * ==================================
   * GET APPLICABLE PAYLATER
   * =================================
   */
  [types.OMS_APPLICABLE_PAYLATER_PROCESS](state, action) {
    return {
      ...state,
      loadingOmsApplicablePaylater: true,
      dataOmsApplicablePaylater: null,
      errorOmsApplicablePaylater: null
    };
  },
  [types.OMS_APPLICABLE_PAYLATER_SUCCESS](state, action) {
    return {
      ...state,
      loadingOmsApplicablePaylater: false,
      dataOmsApplicablePaylater: action.payload
    };
  },
  [types.OMS_APPLICABLE_PAYLATER_FAILED](state, action) {
    return {
      ...state,
      loadingOmsApplicablePaylater: false,
      errorOmsApplicablePaylater: action.payload
    };
  },

   /**
   * ==================================
   * GET KUR OTP
   * =================================
   */
    [types.OMS_GET_KUR_OTP_PROCESS](state, action) {
      return {
        ...state,
        loadingOmsGetKurOtp: true,
        dataOmsGetKurOtp: null,
        errorOmsGetKurOtp: null
      };
    },
    [types.OMS_GET_KUR_OTP_SUCCESS](state, action) {
      return {
        ...state,
        loadingOmsGetKurOtp: false,
        dataOmsGetKurOtp: action.payload
      };
    },
    [types.OMS_GET_KUR_OTP_FAILED](state, action) {
      return {
        ...state,
        loadingOmsGetKurOtp: false,
        errorOmsGetKurOtp: action.payload
      };
    },
});
