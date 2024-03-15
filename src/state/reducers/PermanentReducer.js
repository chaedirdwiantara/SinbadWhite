import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** data */
  token: null,
  otpAgentSignIn: null,
  phoneNumberAgentSignIn: null,
  newOrderSuccessPerMerchant: [],
  /** this for maintenance app */
  appMaintenance: false,
  /** this for version app */
  appVersionCode: 0,
  /** Moengage App Version */
  appVersion: null
};

export const permanent = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   * - token
   * - otpAgentSignIn
   * - phoneNumberAgentSignIn
   * - newOrderSuccessPerMerchant
   */
  [types.DELETE_USER_DATA](state, action) {
    return {
      ...state,
      token: null,
      otpAgentSignIn: null,
      phoneNumberAgentSignIn: null,
      newOrderSuccessPerMerchant: []
    };
  },
  /**
   * =============================
   * MAINTENANCE APP
   * =============================
   */
  [types.APP_MAINTENANCE](state, action) {
    return {
      ...state,
      appMaintenance: action.payload
    };
  },
  /**
   * =============================
   * VERSION APP
   * =============================
   */
  [types.APP_VERSION](state, action) {
    return {
      ...state,
      appVersionCode: action.payload
    };
  },
  /**
   * ===================
   * TOKEN
   * ===================
   */
  [types.SIGN_IN_SUCCESS](state, action) {
    return {
      ...state,
      token: action.payload.token,
      phoneNumberAgentSignIn: null,
      otpAgentSignIn: null
    };
  },
  /** SAVE NEW ORDER PER MERCHANT */
  [types.OMS_CONFIRM_ORDER_SUCCESS](state, action) {
    /** this for make notification in pesanan */
    let newOrder = state.newOrderSuccessPerMerchant;
    const indexOrder = state.newOrderSuccessPerMerchant.indexOf(
      action.payload.data.storeId
    );
    if (indexOrder === -1) {
      newOrder.push(action.payload.data.storeId);
    }
    return {
      ...state,
      newOrderSuccessPerMerchant: newOrder
    };
  },
  /** DELETE NEW ORDER PER MERCHANT */
  [types.HISTORY_DELETE_NEW_ORDER_NOTIF_PER_MERCHANT](state, action) {
    return {
      ...state,
      newOrderSuccessPerMerchant: action.payload
    };
  },
  /**
   * THIS FOR BUG FIX OTP
   * When user move to sms, and back to the app
   * OTP page back to login page
   * Fix: save the otp and clear after success login
   * save otp for flag (user already send otp request)
   */
  /** SAVE PHONE NUMBER */
  [types.OTP_GET_PROCESS](state, action) {
    const phoneNumberAgentSignIn = action.payload.split('');
    phoneNumberAgentSignIn.splice(0, 1);
    return {
      ...state,
      phoneNumberAgentSignIn: phoneNumberAgentSignIn.join('')
    };
  },
  /** SAVE OTP */
  [types.OTP_GET_SUCCESS](state, action) {
    return {
      ...state,
      otpAgentSignIn: action.payload
    };
  },
  /** Moengage App Version Code */
  [types.SAVE_APP_VERSION](state, action) {
    return {
      ...state,
      appVersion: action.payload
    };
  }
});
