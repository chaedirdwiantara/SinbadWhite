import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetCollectionStatus: false,
  loadingSfaGetDetail: false,
  loadingGetCollectionList: false,
  loadingGetReferenceList: false,
  loadingSfaGetPaymentMethod: false,
  loadingSfaGetAllBank: false,
  loadingSfaGetBankAccount: false,
  loadingSfaPostPaymentMethod: false,
  loadingSfaPostCollectionPayment: false,
  loadingSfaGetStampList: false,
  loadingLoadMoreGetSfa: false,
  refreshGetCollection: false,
  loadingSfaGetStatusOrder: false,
  loadingSfaGetCollectionImage: false,
  loadingSfaGetPrincipal: false,
  loadingLoadmorePrincipal: false,
  loadingLoadmoreBankAccount: false,
  loadingSfaGetCollectionLog: false,
  loadingLoadmoreCollectionLog: false,
  loadingSfaGetCollectionDetail: false,
  loadingSfaEditCollection: false,
  loadingSfaDeleteCollection: false,
  loadingLoadMoreGetReferenceList: false,
  loadingSfaGetBillingDetail: false,
  loadingSfaGetPaymentCollectionLog: false,
  loadingSfaPatchCollectionMethod: false,
  /** data */
  dataGetCollectionStatus: null,
  dataSfaGetDetail: null,
  dataGetCollectionList: null,
  dataGetReferenceList: [],
  dataSfaGetPaymentMethod: null,
  dataSfaGetAllBank: null,
  dataSfaGetBankAccount: null,
  dataSfaPostPaymentMethod: null,
  dataSfaPostCollectionPayment: null,
  dataSfaGetStampList: null,
  dataSfaGetStatusOrder: null,
  dataSfaGetCollectionImage: null,
  dataSfaGetPrincipal: null,
  dataLoadmorePrincipal: null,
  dataLoadmoreBankAccount: null,
  dataSfaGetCollectionLog: null,
  dataLoadmoreCollectionLog: null,
  dataSfaGetCollectionDetail: null,
  dataSfaEditCollection: null,
  dataSfaDeleteCollection: null,
  dataSfaGetBillingDetail: null,
  dataSfaPostBillingDetail: null,
  dataSfaGetPaymentCollectionLog: null,
  dataSfaPatchCollectionMethod: null,
  /** error */
  errorGetCollectionStatus: null,
  errorSfaGetDetail: null,
  errorGetCollectionList: null,
  errorGetReferenceList: null,
  errorSfaGetPaymentMethod: null,
  errorSfaGetAllBank: null,
  errorSfaGetBankAccount: null,
  errorSfaPostPaymentMethod: null,
  errorSfaPostCollectionPayment: null,
  errorSfaGetStampList: null,
  errorSfaGetStatusOrder: null,
  errorSfaGetCollectionImage: null,
  errorSfaGetPrincipal: null,
  errorLoadmorePrincipal: null,
  errorLoadmoreBankAccount: null,
  errorSfaGetCollectionLog: null,
  errorLoadmoreCollectionLog: null,
  errorSfaGetCollectionDetail: null,
  errorSfaEditCollection: null,
  errorSfaDeleteCollection: null,
  errorSfaGetBillingDetail: null,
  errorSfaPostBillingDetail: null,
  errorSfaGetPaymentCollectionLog: null,
  errorSfaPatchCollectionMethod: null
};

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
      loadingGetCollectionList: action.payload.loading,
      errorGetCollectionList: null
    };
  },
  [types.SFA_GET_COLLECTION_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionList: false,
      loadingLoadMoreGetSfa: false,
      refreshGetCollection: false,
      dataGetCollectionList: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_FAILED](state, action) {
    return {
      ...state,
      loadingGetCollectionList: false,
      refreshGetCollection: false,
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
      loadingGetReferenceList: action.payload.loading,
      errorGetReferenceList: null
    };
  },
  [types.SFA_GET_REFERENCE_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetReferenceList: false,
      dataGetReferenceList: action.payload,
      loadingLoadMoreGetReferenceList: false
    };
  },
  [types.SFA_GET_REFERENCE_FAILED](state, action) {
    return {
      ...state,
      loadingGetReferenceList: false,
      errorGetReferenceList: action.payload
    };
  },
  [types.SFA_COLLECTION_LIST_LOADMORE_PROCESS](state, action) {
    return {
      ...state,
      loadingLoadMoreGetReferenceList: true,
      pageGetSfaReferenceList: action.payload
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
   * GET ALL BANK
   * ==========================
   */
  [types.SFA_GET_ALL_BANK_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetAllBank: true,
      dataSfaGetAllBank: null,
      errorSfaGetAllBank: null
    };
  },
  [types.SFA_GET_ALL_BANK_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetAllBank: false,
      dataSfaGetAllBank: action.payload
    };
  },
  [types.SFA_GET_ALL_BANK_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetAllBank: false,
      errorSfaGetAllBank: action.payload
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
      loadingSfaPostPaymentMethod: true,
      dataSfaPostPaymentMethod: null,
      errorSfaPostPaymentMethod: null
    };
  },
  [types.SFA_POST_PAYMENT_METHOD_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaPostPaymentMethod: false,
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

  /**
   * ==========================
   * POST COLLECTION PAYMENT
   * ==========================
   */
  [types.SFA_POST_COLLECTION_PAYMENT_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaPostCollectionPayment: true,
      dataSfaPostCollectionPayment: null,
      errorSfaPostCollectionPayment: null
    };
  },
  [types.SFA_POST_COLLECTION_PAYMENT_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaPostCollectionPayment: false,
      dataSfaPostCollectionPayment: action.payload
    };
  },
  [types.SFA_POST_COLLECTION_PAYMENT_FAILED](state, action) {
    return {
      ...state,
      loadingSfaPostCollectionPayment: false,
      errorSfaPostCollectionPayment: action
    };
  },

  /**
   * ==========================
   * GET STAMP LIST
   * ==========================
   */
  [types.SFA_GET_STAMP_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetStampList: true,
      dataSfaGetStampList: null,
      errorSfaGetStampList: null
    };
  },
  [types.SFA_GET_STAMP_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetStampList: false,
      dataSfaGetStampList: action.payload
    };
  },
  [types.SFA_GET_STAMP_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetStampList: false,
      errorSfaGetStampList: action.payload
    };
  },

  [types.SFA_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetSfa: true,
      pageGetSfa: action.payload
    };
  },

  [types.SFA_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetCollection: true,
      loadingGetCollectionList: true,
      dataGetCollectionList: []
    };
  },

  /**
   * ==========================
   * GET STATUS ORDER
   * ==========================
   */
  [types.SFA_GET_STATUS_ORDER_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetStatusOrder: true,
      dataSfaGetStatusOrder: null,
      errorSfaGetStatusOrder: null
    };
  },
  [types.SFA_GET_STATUS_ORDER_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetStatusOrder: false,
      dataSfaGetStatusOrder: action.payload
    };
  },
  [types.SFA_GET_STATUS_ORDER_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetStatusOrder: false,
      errorSfaGetStatusOrder: action.payload
    };
  },

  /**
   * ==========================
   * GET TRANSFER IMAGE
   * ==========================
   */
  [types.SFA_GET_COLLECTION_IMAGE_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionImage: true,
      dataSfaGetCollectionImage: null,
      errorSfaGetCollectionImage: null
    };
  },
  [types.SFA_GET_COLLECTION_IMAGE_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionImage: false,
      dataSfaGetCollectionImage: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_IMAGE_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionImage: false,
      errorSfaGetCollectionImage: action.payload
    };
  },
  /**
   * ==========================
   * GET PRINCIPAL
   * ==========================
   */
  [types.SFA_GET_PRINCIPAL_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPrincipal: true,
      dataSfaGetPrincipal: null,
      errorSfaGetPrincipal: null
    };
  },
  [types.SFA_GET_PRINCIPAL_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPrincipal: false,
      dataSfaGetPrincipal: action.payload
    };
  },
  [types.SFA_GET_PRINCIPAL_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetPrincipal: false,
      errorSfaGetPrincipal: action.payload
    };
  },

  /**
   * =============================
   * LOADMORE PRINCIPAL
   * =============================
   */
  [types.SFA_PRINCIPAL_LOADMORE_PROCESS](state, action) {
    return {
      ...state,
      loadingLoadmorePrincipal: true,
      errorGetDebtSummaries: null
    };
  },
  [types.SFA_PRINCIPAL_LOADMORE_SUCCESS](state, action) {
    return {
      ...state,
      dataSfaGetPrincipal: action.payload,
      loadingLoadmorePrincipal: false
    };
  },
  [types.SFA_PRINCIPAL_LOADMORE_FAILED](state, action) {
    return {
      ...state,
      loadingLoadmorePrincipal: false,
      errorSfaGetPrincipal: action.payload
    };
  },

  /**
   * =============================
   * LOADMORE BANK ACCOUNT
   * =============================
   */
  [types.SFA_BANK_ACCOUNT_LOADMORE_PROCESS](state, action) {
    return {
      ...state,
      loadingLoadmoreBankAccount: true,
      errorSfaGetBankAccount: null
    };
  },
  [types.SFA_BANK_ACCOUNT_LOADMORE_SUCCESS](state, action) {
    return {
      ...state,
      dataSfaGetBankAccount: action.payload,
      loadingLoadmoreBankAccount: false
    };
  },
  [types.SFA_BANK_ACCOUNT_LOADMORE_FAILED](state, action) {
    return {
      ...state,
      loadingLoadmoreBankAccount: false,
      errorSfaGetBankAccount: action.payload
    };
  },
  /**
   * ==========================
   * GET COLLECTION LOG
   * ==========================
   */
  [types.SFA_GET_COLLECTION_LOG_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionLog: true,
      dataSfaGetCollectionLog: null,
      errorSfaGetCollectionLog: null
    };
  },
  [types.SFA_GET_COLLECTION_LOG_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionLog: false,
      dataSfaGetCollectionLog: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_LOG_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionLog: false,
      errorSfaGetCollectionLog: action.payload
    };
  },
  /**
   * =============================
   * LOADMORE COLLECTION LOG
   * =============================
   */
  [types.SFA_COLLECTION_LOG_LOADMORE_PROCESS](state, action) {
    return {
      ...state,
      loadingLoadmoreCollectionLog: true,
      errorSfaGetCollectionLog: null
    };
  },
  [types.SFA_COLLECTION_LOG_LOADMORE_SUCCESS](state, action) {
    return {
      ...state,
      dataSfaGetCollectionLog: action.payload,
      loadingLoadmoreCollectionLog: false
    };
  },
  [types.SFA_COLLECTION_LOG_LOADMORE_FAILED](state, action) {
    return {
      ...state,
      loadingLoadmoreCollectionLog: false,
      errorSfaGetCollectionLog: action.payload
    };
  },

  /**
   * ==========================
   * GET COLLECTION LOG
   * ==========================
   */
  [types.SFA_GET_COLLECTION_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionDetail: true,
      dataSfaGetCollectionDetail: null,
      errorSfaGetCollectionDetail: null
    };
  },
  [types.SFA_GET_COLLECTION_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionDetail: false,
      dataSfaGetCollectionDetail: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetCollectionDetail: false,
      errorSfaGetCollectionDetail: action.payload
    };
  },

  /**
   * ==========================
   * EDIT COLLECTION
   * ==========================
   */
  [types.SFA_EDIT_COLLECTION_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaEditCollection: true,
      dataSfaEditCollection: null,
      errorSfaEditCollection: null
    };
  },
  [types.SFA_EDIT_COLLECTION_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaEditCollection: false,
      dataSfaEditCollection: action.payload
    };
  },
  [types.SFA_EDIT_COLLECTION_FAILED](state, action) {
    return {
      ...state,
      loadingSfaEditCollection: false,
      errorSfaEditCollection: action.payload
    };
  },

  /**
   * ==========================
   * DELETE COLLECTION
   * ==========================
   */
  [types.SFA_DELETE_COLLECTION_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaDeleteCollection: true,
      dataSfaDeleteCollection: null,
      errorSfaDeleteCollection: null
    };
  },
  [types.SFA_DELETE_COLLECTION_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaDeleteCollection: false,
      dataSfaDeleteCollection: action.payload
    };
  },
  [types.SFA_DELETE_COLLECTION_FAILED](state, action) {
    return {
      ...state,
      loadingSfaDeleteCollection: false,
      errorSfaDeleteCollection: action.payload
    };
  },

  /**
   * ==========================
   * GET BILLING DETAIL
   * ==========================
   */
  [types.SFA_GET_BILLING_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetBillingDetail: true,
      dataSfaGetBillingDetail: null,
      errorSfaGetBillingDetail: null
    };
  },
  [types.SFA_GET_BILLING_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetBillingDetail: false,
      dataSfaGetBillingDetail: action.payload
    };
  },
  [types.SFA_GET_BILLING_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetBillingDetail: false,
      errorSfaGetBillingDetail: action.payload
    };
  },

  /**
   * ==========================
   * GET COLLECTION PAYMENT LOG
   * ==========================
   */
  [types.SFA_GET_PAYMENT_COLLECTION_LOG_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPaymentCollectionLog: true,
      dataSfaGetPaymentCollectionLog: null,
      errorSfaGetPaymentCollectionLog: null
    };
  },
  [types.SFA_GET_PAYMENT_COLLECTION_LOG_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPaymentCollectionLog: false,
      dataSfaGetPaymentCollectionLog: action.payload
    };
  },
  [types.SFA_GET_PAYMENT_COLLECTION_LOG_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetPaymentCollectionLog: false,
      errorSfaGetPaymentCollectionLog: action.payload
    };
  },
  /**
   * ==========================
   * PATCH COLLECTION METHOD
   * ==========================
   */
  [types.SFA_EDIT_COLLECTION_METHOD_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaPatchCollectionMethod: true,
      dataSfaSfaPatchCollectionMethod: null,
      errorSfaSfaPatchCollectionMethod: null
    };
  },
  [types.SFA_EDIT_COLLECTION_METHOD_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaPatchCollectionMethod: false,
      dataSfaPatchCollectionMethod: action.payload
    };
  },
  [types.SFA_EDIT_COLLECTION_METHOD_FAILED](state, action) {
    return {
      ...state,
      loadingSfaPatchCollectionMethod: false,
      errorSfaSfaPatchCollectionMethod: action.payload
    };
  }
});
