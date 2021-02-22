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