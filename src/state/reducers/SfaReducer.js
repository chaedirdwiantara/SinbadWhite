import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
/** loading */
loadingGetCollectionStatus: false,
loadingSfaGetDetail: false,
loadingGetCollectionList: false,
loadingGetReferenceList : false,
loadingSfaGetPaymentMethod: false,
/** data */
dataGetCollectionStatus: null,
dataSfaGetDetail: null,
dataGetCollectionList: null,
dataGetReferenceList : null,
dataSfaGetPaymentMethod: null,
/** error */
errorGetCollectionStatus: null,
errorSfaGetDetail: null,
errorGetCollectionList: null,
errorGetReferenceList: null,
errorSfaGetPaymentMethod: null,
}

export const sfa = createReducer(INITIAL_STATE, {
     /**
   * ==========================
   * GET COLLECTION STATUS
   * ==========================
   */
  [types.SFA_GET_COLLECTION_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionStatus: true,
      dataGetCollectionStatus: null,
      errorGetCollectionStatus: null
    };
  },
  [types.SFA_GET_COLLECTION_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionStatus: false,
      dataGetCollectionStatus: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingGetCollectionStatus: false,
      errorGetCollectionStatus: action.payload
    };
  },
     /**
   * ==========================
   * GET SFA DETAIL
   * ==========================
   */
  [types.SFA_GET_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetDetail: true,
      dataSfaGetDetail: null,
      errorSfaGetDetail: null
    };
  },
  [types.SFA_GET_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetDetail: false,
      dataSfaGetDetail: action.payload
    };
  },
  [types.SFA_GET_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetDetail: false,
      errorSfaGetDetail: action.payload
    };
  },
     /**
   * ==========================
   * GET COLLECTION LIST
   * ==========================
   */
  [types.SFA_GET_COLLECTION_PROCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionList: true,
      dataGetCollectionList: null,
      errorGetCollectionList: null
    };
  },
  [types.SFA_GET_COLLECTION_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionList: false,
      dataGetCollectionList: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_FAILED](state, action) {
    return {
      ...state,
      loadingGetCollectionList: false,
      errorGetCollectionList: action.payload
    };
  },

     /**
   * ==========================
   * GET REFERENCE LIST
   * ==========================
   */
  [types.SFA_GET_REFERENCE_PROCESS](state, action) {
    return {
      ...state,
      loadingGetReferenceList: true,
     dataGetReferenceList: null,
      errorGetReferenceList: null
    };
  },
  [types.SFA_GET_REFERENCE_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetReferenceList: false,
      dataGetReferenceList: action.payload
    };
  },
  [types.SFA_GET_REFERENCE_FAILED](state, action) {
    return {
      ...state,
      loadingGetReferenceList: false,
      errorGetReferenceList: action.payload
    };
  },

    /**
   * ==========================
   * GET PAYMENT METHOD
   * ==========================
   */
  [types.SFA_GET_PAYMENT_METHOD_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPAymentMethod: true,
      dataSfaGetPaymentMethod: null,
      errorSfaGetPaymentMethod: null
    };
  },
  [types.SFA_GET_PAYMENT_METHOD_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPAymentMethod: false,
      dataSfaGetPaymentMethod: action.payload
    };
  },
  [types.SFA_GET_PAYMENT_METHOD_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetPaymentMethod: false,
      errorSfaGetPaymentMethod: action.payload
    };
  },
})