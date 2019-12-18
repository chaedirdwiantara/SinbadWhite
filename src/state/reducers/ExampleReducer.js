import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  dataExample: null
};

export const example = createReducer(INITIAL_STATE, {
  [types.EXAMPLE_PROCESS](state, action) {
    return {
      ...state,
      dataExample: action.payload
    };
  }
});
