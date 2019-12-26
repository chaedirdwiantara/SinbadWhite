import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetOTP: false,
  /** data */
  dataGetOTP: null,
  /** error */
  errorGetOTP: null
};

export const auth = createReducer(INITIAL_STATE, {
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
  }
});
