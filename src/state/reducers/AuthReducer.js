import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetOTP: false,
  loadingSignIn: false,
  loadingCheckPhoneAvailble: false,
  /** data */
  dataGetOTP: null,
  dataCheckPhoneAvailble: null,
  dataSignIn: null,
  /** error */
  errorGetOTP: null,
  errorSignIn: null,
  errorCheckPhoneAvailble: null
};

export const auth = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ===================
   * OTP
   * ===================
   */
  [types.OTP_GET_PROCESS](state, action) {
    return {
      ...state,
      dataGetOTP: null,
      errorGetOTP: null,
      loadingGetOTP: true
    };
  },
  [types.OTP_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetOTP: false,
      dataGetOTP: action.payload
    };
  },
  [types.OTP_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetOTP: false,
      errorGetOTP: action.payload
    };
  },
  /**
   * ===================
   * CHECK PHONE NUMBER AVAILABLE
   * ===================
   */
  [types.CHECK_PHONE_NUMBER_AVAILABLE_PROCESS](state, action) {
    return {
      ...state,
      dataCheckPhoneAvailble: null,
      errorCheckPhoneAvailble: null,
      loadingCheckPhoneAvailble: true
    };
  },
  [types.CHECK_PHONE_NUMBER_AVAILABLE_SUCCESS](state, action) {
    return {
      ...state,
      loadingCheckPhoneAvailble: false,
      dataCheckPhoneAvailble: action.payload
    };
  },
  [types.CHECK_PHONE_NUMBER_AVAILABLE_FAILED](state, action) {
    return {
      ...state,
      loadingCheckPhoneAvailble: false,
      errorCheckPhoneAvailble: action.payload
    };
  },
  /**
   * ===================
   * SIGIN
   * ===================
   */
  [types.SIGN_IN_PROCESS](state, action) {
    return {
      ...state,
      dataSignIn: null,
      errorSignIn: null,
      loadingSignIn: true
    };
  },
  [types.SIGN_IN_SUCCESS](state, action) {
    return {
      ...state,
      loadingSignIn: false,
      dataSignIn: action.payload
    };
  },
  [types.SIGN_IN_FAILED](state, action) {
    return {
      ...state,
      loadingSignIn: false,
      errorSignIn: action.payload
    };
  }
});
