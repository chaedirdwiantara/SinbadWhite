import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
/** loading */
loadingGetCollectionStatus: false,
loadingSfaGetDetail: false,
loadingGetCollectionList: false,
loadingGetReferenceList : false,
loadingSfaGetPaymentMethod: false,
loadingSfaGetBankAccount: false,
loadingSfaPostPaymentMethod: false,
/** data */
dataGetCollectionStatus: null,
dataSfaGetDetail: null,
dataGetCollectionList: null,
dataGetReferenceList : null,
dataSfaGetPaymentMethod: null,
dataSfaGetBankAccount: null,
dataSfaPostPaymentMethod: null,
/** error */
errorGetCollectionStatus: null,
errorSfaGetDetail: null,
errorGetCollectionList: null,
errorGetReferenceList: null,
errorSfaGetPaymentMethod: null,
errorSfaGetBankAccount: null,
errorSfaPostPaymentMethod: null,
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

  /**
   * ==========================
   * GET BANK ACCOUNT
   * ==========================
   */
  [types.SFA_GET_BANK_ACCOUNT_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetBankAccount: true,
      dataSfaGetBankAccount: null,
      errorSfaGetBankAccount: null
    };
  },
  [types.SFA_GET_BANK_ACCOUNT_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetBankAccount: false,
      dataSfaGetBankAccount: action.payload
    };
  },
  [types.SFA_GET_BANK_ACCOUNT_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetBankAccount: false,
      errorSfaGetBankAccount: action.payload
    };
  },

   /**
   * ==========================
   * POST PAYMENT METHOD
   * ==========================
   */
  [types.SFA_POST_PAYMENT_METHOD_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaPostPAymentMethod: true,
      dataSfaPostPaymentMethod: null,
      errorSfaPostPaymentMethod: null
    };
  },
  [types.SFA_POST_PAYMENT_METHOD_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaPostPAymentMethod: false,
      dataSfaPostPaymentMethod: action.payload
    };
  },
  [types.SFA_POST_PAYMENT_METHOD_FAILED](state, action) {
    return {
      ...state,
      loadingSfaPostPaymentMethod: false,
      errorSfaPostPaymentMethod: action.payload
    };
  },
})