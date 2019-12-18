import * as types from '../types';

export function exampleGet() {
  return {
    type: types.EXAMPLE_PROCESS,
    payload: 'test data'
  };
}
