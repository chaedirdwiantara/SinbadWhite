import * as types from '../types';
/**
 * ===========================
 * GET COLLECTION STATUS
 * ===========================
 */
/** === SFA GET COLLECTION STATUS PROCESS === */
export function sfaGetCollectionStatusProcess(data) {
    return { type: types.SFA_GET_COLLECTION_STATUS_PROCESS, payload: data };
  }
  /** === SFA GET COLLECTION STATUS SUCCESS === */
  export function sfaGetCollectionStatusSuccess(data) {
    if (data.result === 'Ok') {
      return {
        type: types.SFA_GET_COLLECTION_STATUS_SUCCESS,
        payload: data.data
      };
    }
    return { type: types.SFA_GET_COLLECTION_STATUS_FAILED, payload: data };
  }
  /** === SFA GET COLLECTION STATUS FAILED === */
  export function sfaGetCollectionStatusFailed(data) {
    return { type: types.SFA_GET_COLLECTION_STATUS_FAILED, payload: data };
  }
/**
 * ===========================
 * GET SFA DETAIL
 * ===========================
 */
/** === SFA GET COLLECTION STATUS PROCESS === */
export function sfaGetDetailProcess(data) {
  return { type: types.SFA_GET_DETAIL_PROCESS, payload: data };
}
/** === SFA GET COLLECTION STATUS SUCCESS === */
export function sfaGetDetailSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_DETAIL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_DETAIL_FAILED, payload: data };
}
/** === SFA GET COLLECTION STATUS FAILED === */
export function sfaGetDetailFailed(data) {
  return { type: types.SFA_GET_DETAIL_FAILED, payload: data };
}

/**
 * ===========================
 * GET COLLECTION LIST
 * ===========================
 */
/** === SFA GET COLLECTION LIST PROCESS === */
export function sfaGetCollectionListProcess(data) {
  return { type: types.SFA_GET_COLLECTION_PROCESS, payload: data };
}
/** === SFA GET COLLECTION LIST SUCCESS === */
export function sfaGetCollectionListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_COLLECTION_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_COLLECTION_FAILED, payload: data };
}
/** === SFA GET COLLECTION LIST FAILED === */
export function sfaGetCollectionListFailed(data) {
  return { type: types.SFA_GET_COLLECTION_FAILED, payload: data };
}