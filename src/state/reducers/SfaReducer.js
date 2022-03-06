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
  loadingSfaGetCollectionImage: false,
  loadingSfaGetPrincipal: false,
  loadingLoadmorePrincipal: false,
  loadingLoadmoreBankAccount: false,
  loadingSfaGetCollectionLog: false,
  loadingLoadmoreCollectionLog: false,
  loadingSfaGetCollectionDetail: false,
  loadingSfaEditBilling: false,
  loadingSfaDeletePaymentBilling: false,
  loadingLoadMoreGetReferenceList: false,
  loadingSfaGetBillingDetail: false,
  loadingSfaGetPaymentCollectionLog: false,
  loadingSfaPatchCollectionMethod: false,
  loadingSfaDeleteCollectionMethod: true,
  loadingLoadMoreGetPaymentCollectionLog: false,
  loadingGetCollectionListStatus: false,
  loadingSfaCheckCollectionStatus: false,
  loadingSfaGetReasonNotToPay: null,
  loadingSfaGetReturnBalance: false,
  loadingGetStoreCollectionList: false,
  refreshGetStoreCollectionList: false,
  loadingLoadmoreGetStoreCollectionList: false,
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
  dataSfaGetCollectionImage: null,
  dataSfaGetPrincipal: null,
  dataLoadmorePrincipal: null,
  dataLoadmoreBankAccount: null,
  dataSfaGetCollectionLog: null,
  dataLoadmoreCollectionLog: null,
  dataSfaGetCollectionDetail: null,
  dataSfaEditBilling: null,
  dataSfaDeletePaymentBilling: null,
  dataSfaGetBillingDetail: null,
  dataSfaPostBillingDetail: null,
  dataSfaGetPaymentCollectionLog: null,
  dataSfaPatchCollectionMethod: null,
  dataSfaDeleteCollectionMethod: null,
  dataGetCollectionListStatus: null,
  dataSfaGetReasonNotToPay: null,
  selectedCollectionTransaction: null,
  dataSfaCheckCollectionStatus: null,
  dataSfaGetReturnBalance: null,
  dataGetStoreCollectionList: [],
  totalGetStoreCollectionList: 0,
  skipGetStoreCollection: 0,
  selectedStore: null,
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
  errorSfaGetCollectionImage: null,
  errorSfaGetPrincipal: null,
  errorLoadmorePrincipal: null,
  errorLoadmoreBankAccount: null,
  errorSfaGetCollectionLog: null,
  errorLoadmoreCollectionLog: null,
  errorSfaGetCollectionDetail: null,
  errorSfaEditBilling: null,
  errorSfaDeletePaymentBilling: null,
  errorSfaGetBillingDetail: null,
  errorSfaPostBillingDetail: null,
  errorSfaGetPaymentCollectionLog: null,
  errorSfaPatchCollectionMethod: null,
  errorSfaDeleteCollectionMethod: null,
  errorGetCollectionListStatus: null,
  errorSfaCheckCollectionStatus: null,
  errorSfaGetReasonNotToPay: null,
  errorSfaGetReturnBalance: null,
  errorGetStoreCollectionList: null
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
  [types.SFA_EDIT_BILLING_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaEditBilling: true,
      dataSfaEditBilling: null,
      errorSfaEditBilling: null
    };
  },
  [types.SFA_EDIT_BILLING_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaEditBilling: false,
      dataSfaEditBilling: action.payload
    };
  },
  [types.SFA_EDIT_BILLING_FAILED](state, action) {
    return {
      ...state,
      loadingSfaEditBilling: false,
      errorSfaEditBilling: action.payload
    };
  },

  /**
   * ==========================
   * DELETE COLLECTION
   * ==========================
   */
  [types.SFA_DELETE_PAYMENT_BILLING_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaDeletePaymentBilling: true,
      dataSfaDeletePaymentBilling: null,
      errorSfaDeletePaymentBilling: null
    };
  },
  [types.SFA_DELETE_PAYMENT_BILLING_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaDeletePaymentBilling: false,
      dataSfaDeletePaymentBilling: action.payload
    };
  },
  [types.SFA_DELETE_PAYMENT_BILLING_FAILED](state, action) {
    return {
      ...state,
      loadingSfaDeletePaymentBilling: false,
      errorSfaDeletePaymentBilling: action.payload
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
      loadingSfaGetPaymentCollectionLog: action.payload.loading,
      errorSfaGetPaymentCollectionLog: null
    };
  },
  [types.SFA_GET_PAYMENT_COLLECTION_LOG_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetPaymentCollectionLog: false,
      loadingLoadMoreGetPaymentCollectionLog: false,
      dataSfaGetPaymentCollectionLog: action.payload
    };
  },
  [types.SFA_GET_PAYMENT_COLLECTION_LOG_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetPaymentCollectionLog: false,
      loadingLoadMoreGetPaymentCollectionLog: false,
      errorSfaGetPaymentCollectionLog: action.payload
    };
  },
  [types.SFA_PAYMENT_COLLECTION_LOG_LOADMORE_PROCESS](state, action) {
    return {
      ...state,
      loadingLoadMoreGetPaymentCollectionLog: true,
      pageGetSfaReferenceList: action.payload
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
      dataSfaPatchCollectionMethod: null,
      errorSfaPatchCollectionMethod: null
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
      errorSfaPatchCollectionMethod: action.payload
    };
  },

  /**
   * ==========================
   * DELETE COLLECTION METHOD
   * ==========================
   */
  [types.SFA_DELETE_COLLECTION_METHOD_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaDeleteCollectionMethod: true,
      dataSfaDeleteCollectionMethod: null,
      errorSfaDeleteCollectionMethod: null
    };
  },
  [types.SFA_DELETE_COLLECTION_METHOD_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaDeleteCollectionMethod: false,
      dataSfaDeleteCollectionMethod: action.payload
    };
  },
  [types.SFA_DELETE_COLLECTION_METHOD_FAILED](state, action) {
    return {
      ...state,
      loadingSfaDeleteCollectionMethod: false,
      errorSfaDeleteCollectionMethod: action.payload
    };
  },

  /**
   * ==========================
   * GET COLLECTION LIST STATUS
   * ==========================
   */
  [types.SFA_GET_COLLECTION_LIST_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionListStatus: true,
      dataGetCollectionListStatus: null,
      errorGetCollectionListStatus: null
    };
  },
  [types.SFA_GET_COLLECTION_LIST_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetCollectionListStatus: false,
      dataGetCollectionListStatus: action.payload
    };
  },
  [types.SFA_GET_COLLECTION_LIST_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingGetCollectionListStatus: false,
      errorGetCollectionListStatus: action.payload
    };
  },
  /**
   * ============================
   * SELECTED COLLECTION TRANSACTION
   * ============================
   */
  [types.COLLECTION_SELECTED](state, action) {
    return {
      ...state,
      selectedCollectionTransaction: { ...action.payload }
    };
  },

  /**
   * ==========================
   * CHECK COLLECTION STATUS
   * ==========================
   */
  [types.SFA_CHECK_COLLECTION_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaCheckCollectionStatus: true,
      dataSfaCheckCollectionStatus: null,
      errorSfaCheckCollectionStatus: null
    };
  },
  [types.SFA_CHECK_COLLECTION_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaCheckCollectionStatus: false,
      dataSfaCheckCollectionStatus: action.payload
    };
  },
  [types.SFA_CHECK_COLLECTION_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingSfaCheckCollectionStatus: false,
      errorSfaCheckCollectionStatus: action.payload
    };
  },
  /**
   * ==========================
   * GET REASON NOT TO PAY
   * ==========================
   */
  [types.SFA_GET_REASON_NOT_TO_PAY_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetReasonNotToPay: true,
      dataSfaGetReasonNotToPay: null,
      errorSfaGetReasonNotToPay: null
    };
  },
  [types.SFA_GET_REASON_NOT_TO_PAY_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetReasonNotToPay: false,
      dataSfaGetReasonNotToPay: action.payload
    };
  },
  [types.SFA_GET_REASON_NOT_TO_PAY_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetReasonNotToPay: false,
      errorSfaGetReasonNotToPay: action.payload
    };
  },
  /**
   * ==========================
   * POST TRANSACTION CHECKOUT
   * ==========================
   */
  [types.SFA_POST_TRANSACTION_CHECKOUT_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaPostTransactionCheckout: true,
      dataSfaPostTransactionCheckout: null,
      errorSfaPostTransactionCheckout: null
    };
  },
  [types.SFA_POST_TRANSACTION_CHECKOUT_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaPostTransactionCheckout: false,
      dataSfaPostTransactionCheckout: action.payload
    };
  },
  [types.SFA_POST_TRANSACTION_CHECKOUT_FAILED](state, action) {
    return {
      ...state,
      loadingSfaPostTransactionCheckout: false,
      errorSfaPostTransactionCheckout: action.payload
    };
  },
  [types.SFA_POST_TRANSACTION_CHECKOUT_RESET](state, action) {
    return {
      ...state,
      loadingSfaPostTransactionCheckout: false,
      dataSfaPostTransactionCheckout: null,
      errorSfaPostTransactionCheckout: null
    };
  },
  /**
   * ==========================
   * GET RETURN BALANCE
   * ==========================
   */
  [types.SFA_GET_RETURN_BALANCE_PROCESS](state, action) {
    return {
      ...state,
      loadingSfaGetReturnBalance: true,
      dataSfaGetReturnBalance: null,
      errorSfaGetReturnBalance: null
    };
  },
  [types.SFA_GET_RETURN_BALANCE_SUCCESS](state, action) {
    return {
      ...state,
      loadingSfaGetReturnBalance: false,
      dataSfaGetReturnBalance: action.payload
    };
  },
  [types.SFA_GET_RETURN_BALANCE_FAILED](state, action) {
    return {
      ...state,
      loadingSfaGetReturnBalance: false,
      errorSfaGetReturnBalance: action.payload
    };
  },
  /**
   * ==========================
   * GET STORE COLLECTION LIST
   * ==========================
   */
  [types.SFA_GET_STORE_COLLECTION_LIST_PROCESS](state, action) {
    return {
      ...state,
      loadingGetStoreCollectionList: action.payload.loading,
      errorGetStoreCollectionList: null
    };
  },
  [types.SFA_GET_STORE_COLLECTION_LIST_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetStoreCollectionList: false,
      loadingLoadmoreGetStoreCollection: false,
      refreshGetStoreCollectionList: false,
      totalDataGetStoreCollectionList: action.payload.meta.total,
      dataGetStoreCollectionList: [
        ...state.dataGetStoreCollectionList,
        ...(action.payload.data.stores || [])
      ]
    };
  },
  [types.SFA_GET_STORE_COLLECTION_LIST_FAILED](state, action) {
    return {
      ...state,
      loadingGetStoreCollectionList: false,
      loadingLoadmoreGetStoreCollection: false,
      refreshGetStoreCollectionList: false,
      errorGetStoreCollectionList: action.payload
    };
  },
  [types.SFA_GET_STORE_COLLECTION_LIST_RESET](state, action) {
    return {
      ...state,
      skipGetStoreCollection: 0,
      totalGetStoreCollectionList: 0,
      dataGetStoreCollectionList: []
    };
  },
  [types.SFA_GET_STORE_COLLECTION_LIST_REFRESH](state, action) {
    return {
      ...state,
      refreshGetStoreCollectionList: true,
      loadingGetStoreCollectionList: true,
      skipGetStoreCollection: 0,
      totalGetStoreCollectionList: 0,
      dataGetStoreCollectionList: []
    };
  },
  [types.SFA_GET_STORE_COLLECTION_LIST_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadmoreGetStoreCollectionList: true,
      skipGetStoreCollection: action.payload
    };
  },
  [types.SELECTED_STORE](state, action) {
    return {
      ...state,
      selectedStore: action.payload
    };
  }
});
