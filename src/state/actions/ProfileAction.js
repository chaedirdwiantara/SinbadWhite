import * as types from '../types';
/**
 * ==================================
 * ADD MERCHANT
 * ==================================
 */
/** PORTFOLIO GET PROCESS */
export function profileEditProcess(data) {
  return { type: types.PROFILE_EDIT_PROCESS, payload: data };
}
/** PORTFOLIO GET SUCCESS */
export function profileEditSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PROFILE_EDIT_SUCCESS, payload: data.data };
  }
  return { type: types.PROFILE_EDIT_FAILED, payload: data };
}
/** PORTFOLIO GET FAILED */
export function profileEditFailed(data) {
  return { type: types.PROFILE_EDIT_FAILED, payload: data };
}
