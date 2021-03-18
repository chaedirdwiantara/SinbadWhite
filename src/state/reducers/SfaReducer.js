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
  loadingSfaGetTransferImage: false,
  loadingSfaGetPrincipal: false,
  loadingLoadmorePrincipal: false,
  /** data */
  dataGetCollectionStatus: null,
  dataSfaGetDetail: null,
  dataGetCollectionList: null,
  dataGetReferenceList: null,
  dataSfaGetPaymentMethod: null,
  dataSfaGetAllBank: null,
  dataSfaGetBankAccount: null,
  dataSfaPostPaymentMethod: null,
  dataSfaPostCollectionPayment: null,
  dataSfaGetStampList: null,
  dataSfaGetStatusOrder: null,
  dataSfaGetTransferImage: null,
  dataSfaGetPrincipal: null,
  dataLoadmorePrincipal: null,
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
  errorSfaGetTransferImage: null,
  errorSfaGetPrincipal: null,
  errorLoadmorePrincipal: null,
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
      errorGetCollectionList: null,
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
    [types.SFA_GET_TRANSFER_IMAGE_PROCESS](state, action) {
      return {
        ...state,
        loadingSfaGetTransferImage: true,
        dataSfaGetTransferImage: null,
        errorSfaGetTransferImage: null
      };
    },
    [types.SFA_GET_TRANSFER_IMAGE_SUCCESS](state, action) {
      return {
        ...state,
        loadingSfaGetTransferImage: false,
        dataSfaGetTransferImage: action.payload
      };
    },
    [types.SFA_GET_TRANSFER_IMAGE_FAILED](state, action) {
      return {
        ...state,
        loadingSfaGetTransferImage: false,
        errorSfaGetTransferImage: action.payload
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
      loadingLoadmorePrincipal: false,
    };
  },
  [types.SFA_PRINCIPAL_LOADMORE_FAILED](state, action) {
    return {
      ...state,
      loadingLoadmorePrincipal: false,
      errorSfaGetPrincipal: action.payload
    };
  },
});
