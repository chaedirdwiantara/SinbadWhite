import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetLocation: false,
  /** data */
  dataCart: [],
  dataCheckBoxlistCart: [],
  /** error */
  errorGetLocation: null
};

export const oms = createReducer(INITIAL_STATE, {
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
