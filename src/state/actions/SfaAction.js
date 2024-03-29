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

/**
 * ===========================
 * GET REFERENCE LIST
 * ===========================
 */
/** === SFA LOADMORE REFERENCE LIST PROCESS === */
export function sfaCollectionListLoadmoreProcess(data) {
  return { type: types.SFA_COLLECTION_LIST_LOADMORE_PROCESS, payload: data };
}

/** === SFA GET REFERENCE LIST PROCESS === */
export function sfaGetReferenceListProcess(data) {
  return { type: types.SFA_GET_REFERENCE_PROCESS, payload: data };
}

/** === SFA GET REFERENCE LIST SUCCESS === */
export function sfaGetReferenceListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_REFERENCE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_REFERENCE_FAILED, payload: data };
}
/** === SFA GET REFERENCE LIST FAILED === */
export function sfaGetReferenceListFailed(data) {
  return { type: types.SFA_GET_REFERENCE_FAILED, payload: data };
}

/**
 * ===========================
 * GET PAYMENT METHOD
 * ===========================
 */
/** === SFA GET PAYMENT METHOD PROCESS === */
export function sfaGetPaymentMethodProcess(data) {
  return { type: types.SFA_GET_PAYMENT_METHOD_PROCESS, payload: data };
}

/** === SFA GET PAYMENT METHOD SUCCESS === */
export function sfaGetPaymentMethodSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_PAYMENT_METHOD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_PAYMENT_METHOD_FAILED, payload: data };
}
/** === SFA GET PAYMENT METHOD FAILED === */
export function sfaGetPaymentMethodFailed(data) {
  return { type: types.SFA_GET_PAYMENT_METHOD_FAILED, payload: data };
}

/**
 * ===========================
 * GET ALL BANK
 * ===========================
 */
/** === SFA GET ALL BANK PROCESS === */
export function sfaGetAllBankProcess(data) {
  return { type: types.SFA_GET_ALL_BANK_PROCESS, payload: data };
}

/** === SFA GET ALL BANK SUCCESS === */
export function sfaGetAllBankSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_ALL_BANK_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_ALL_BANK_FAILED, payload: data };
}
/** === SFA GET ALL BANK FAILED === */
export function sfaGetAllBankFailed(data) {
  return { type: types.SFA_GET_ALL_BANK_FAILED, payload: data };
}
/**
 * ===========================
 * GET BANK ACCOUNT
 * ===========================
 */
/** === SFA GET PAYMENT METHOD PROCESS === */
export function sfaGetBankAccountProcess(data) {
  return { type: types.SFA_GET_BANK_ACCOUNT_PROCESS, payload: data };
}

/** === SFA GET PAYMENT METHOD SUCCESS === */
export function sfaGetBankAccountSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_BANK_ACCOUNT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_BANK_ACCOUNT_FAILED, payload: data };
}
/** === SFA GET PAYMENT METHOD FAILED === */
export function sfaGetBankAccountFailed(data) {
  return { type: types.SFA_GET_BANK_ACCOUNT_FAILED, payload: data };
}

/**
 * ===========================
 * POST PAYMENT METHOD
 * ===========================
 */
/** === SFA POST PAYMENT METHOD PROCESS === */
export function sfaPostPaymentMethodProcess(data) {
  return { type: types.SFA_POST_PAYMENT_METHOD_PROCESS, payload: data };
}

/** === SFA POST PAYMENT METHOD SUCCESS === */
export function sfaPostPaymentMethodSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_POST_PAYMENT_METHOD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_POST_PAYMENT_METHOD_FAILED, payload: data };
}
/** === SFA POST PAYMENT METHOD FAILED === */
export function sfaPostPaymentMethodFailed(data) {
  return { type: types.SFA_POST_PAYMENT_METHOD_FAILED, payload: data };
}

/**
 * ===========================
 * POST COLLECTION PAYMENT
 * ===========================
 */
/** === SFA POST COLLECTION PAYMENT PROCESS === */
export function sfaPostCollectionPaymentProcess(data) {
  return { type: types.SFA_POST_COLLECTION_PAYMENT_PROCESS, payload: data };
}

/** === SFA POST COLLECTION PAYMENT SUCCESS === */
export function sfaPostCollectionPaymentSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_POST_COLLECTION_PAYMENT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_POST_COLLECTION_PAYMENT_FAILED, payload: data };
}
/** === SFA POST COLLECTION PAYMENT FAILED === */
export function sfaPostCollectionPaymentFailed(data) {
  return { type: types.SFA_POST_COLLECTION_PAYMENT_FAILED, payload: data };
}

/**
 * ===========================
 * GET STAMP LIST
 * ===========================
 */
/** === SFA GET STAMP LIST PROCESS === */
export function sfaGetStampListProcess(data) {
  return { type: types.SFA_GET_STAMP_PROCESS, payload: data };
}

/** === SFA GET REFERENCE LIST SUCCESS === */
export function sfaGetStampListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_STAMP_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_STAMP_FAILED, payload: data };
}
/** === SFA GET REFERENCE LIST FAILED === */
export function sfaGetStampListFailed(data) {
  return { type: types.SFA_GET_STAMP_FAILED, payload: data };
}

/** === LOAD MORE GET COLLECTION === */
export function SfaGetLoadMore(page) {
  return { type: types.SFA_GET_LOADMORE, payload: page };
}

/** === REFRESH GET COLLECTION === */
export function sfaGetRefresh() {
  return { type: types.SFA_GET_REFRESH };
}

/**
 * ===========================
 * GET TRANSFER IMAGE
 * ===========================
 */
/** === SFA GET TRANSFER IMAGE PROCESS === */
export function sfaGetCollectionImageProcess(data) {
  return { type: types.SFA_GET_COLLECTION_IMAGE_PROCESS, payload: data };
}

/** === SFA GET TRANSFER IMAGE SUCCESS === */
export function sfaGetCollectionImageSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_COLLECTION_IMAGE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_COLLECTION_IMAGE_FAILED, payload: data };
}
/** === SFA GET TRANSFER IMAGE FAILED === */
export function sfaGetCollectionImageFailed(data) {
  return { type: types.SFA_GET_COLLECTION_IMAGE_FAILED, payload: data };
}

/**
 * ===========================
 * GET PRINCIPAL
 * ===========================
 */
/** === SFA GET PRINCIPAL PROCESS === */
export function sfaGetPrincipalProcess(data) {
  return { type: types.SFA_GET_PRINCIPAL_PROCESS, payload: data };
}

/** === SFA GET PRINCIPAL SUCCESS === */
export function sfaGetPrincipalSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_PRINCIPAL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_PRINCIPAL_FAILED, payload: data };
}
/** === SFA GET PRINCIPAL FAILED === */
export function sfaGetPrincipalFailed(data) {
  return { type: types.SFA_GET_PRINCIPAL_FAILED, payload: data };
}

/**
 * ===========================
 * LOADMORE PRINCIPAL
 * ===========================
 */
/** === SFA LOADMORE PRINCIPAL PROCESS === */
export function sfaPrincipalLoadmoreProcess(data) {
  return { type: types.SFA_PRINCIPAL_LOADMORE_PROCESS, payload: data };
}

/** === SFA LOADMORE PRINCIPAL SUCCESS === */
export function sfaPrincipalLoadmoreSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_PRINCIPAL_LOADMORE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_PRINCIPAL_LOADMORE_FAILED, payload: data };
}
/** === SFA LOADMORE PRINCIPAL FAILED === */
export function sfaPrincipalLoadmoreFailed(data) {
  return { type: types.SFA_PRINCIPAL_LOADMORE_FAILED, payload: data };
}

/**
 * ===========================
 * LOADMORE BANK DESTINATION
 * ===========================
 */
/** === SFA LOADMORE BANK DESTINATION PROCESS === */
export function sfaBankAccountLoadmoreProcess(data) {
  return { type: types.SFA_BANK_ACCOUNT_LOADMORE_PROCESS, payload: data };
}

/** === SFA LOADMORE BANK DESTINATION SUCCESS === */
export function sfaBankAccountLoadmoreSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_BANK_ACCOUNT_LOADMORE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_BANK_ACCOUNT_LOADMORE_FAILED, payload: data };
}
/** === SFA LOADMORE BANK DESTINATION FAILED === */
export function sfaBankAccountLoadmoreFailed(data) {
  return { type: types.SFA_BANK_ACCOUNT_LOADMORE_FAILED, payload: data };
}

/**
 * ===========================
 * GET COLLECTION LOG
 * ===========================
 */
/** === SFA GET COLLECTION LOG PROCESS === */
export function sfaGetCollectionLogProcess(data) {
  return { type: types.SFA_GET_COLLECTION_LOG_PROCESS, payload: data };
}

/** === SFA GET COLLECTION LOG SUCCESS === */
export function sfaGetCollectionLogSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_COLLECTION_LOG_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_COLLECTION_LOG_FAILED, payload: data };
}
/** === SFA GET COLLECTION LOG FAILED === */
export function sfaGetCollectionLogFailed(data) {
  return { type: types.SFA_GET_COLLECTION_LOG_FAILED, payload: data };
}

/**
 * ===========================
 * LOADMORE COLLECTION LOG
 * ===========================
 */
/** === SFA LOADMORE COLLECTION LOG PROCESS === */
export function sfaCollectionLogLoadmoreProcess(data) {
  return { type: types.SFA_COLLECTION_LOG_LOADMORE_PROCESS, payload: data };
}

/** === SFA LOADMORE COLLECTION LOG SUCCESS === */
export function sfaCollectionLogLoadmoreSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_COLLECTION_LOG_LOADMORE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_COLLECTION_LOG_LOADMORE_FAILED, payload: data };
}
/** === SFA LOADMORE COLLECTION LOG FAILED === */
export function sfaCollectionLogLoadmoreFailed(data) {
  return { type: types.SFA_COLLECTION_LOG_LOADMORE_FAILED, payload: data };
}

/**
 * ===========================
 * GET COLLECTION DETAIL
 * ===========================
 */
/** === SFA GET COLLECTION DETAIL PROCESS === */
export function sfaGetCollectionDetailProcess(data) {
  return { type: types.SFA_GET_COLLECTION_DETAIL_PROCESS, payload: data };
}

/** === SFA GET COLLECTION DETAIL SUCCESS === */
export function sfaGetCollectionDetailSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_COLLECTION_DETAIL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_COLLECTION_DETAIL_FAILED, payload: data };
}
/** === SFA GET COLLECTION DETAIL FAILED === */
export function sfaGetCollectionDetailFailed(data) {
  return { type: types.SFA_GET_COLLECTION_DETAIL_FAILED, payload: data };
}

/**
 * ===========================
 * EDIT COLLECTION
 * ===========================
 */
/** === SFA EDIT COLLECTION PROCESS === */
export function sfaEditBillingProcess(data) {
  return { type: types.SFA_EDIT_BILLING_PROCESS, payload: data };
}

/** === SFA EDIT COLLECTION SUCCESS === */
export function sfaEditBillingSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_EDIT_BILLING_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_EDIT_BILLING_FAILED, payload: data };
}
/** === SFA EDIT COLLECTION FAILED === */
export function sfaEditBillingFailed(data) {
  return { type: types.SFA_EDIT_BILLING_FAILED, payload: data };
}

/**
 * ===========================
 * DELETE COLLECTION
 * ===========================
 */
/** === SFA DELETE COLLECTION PROCESS === */
export function sfaDeletePaymentBillingProcess(data) {
  return { type: types.SFA_DELETE_PAYMENT_BILLING_PROCESS, payload: data };
}

/** === SFA DELETE COLLECTION SUCCESS === */
export function sfaDeletePaymentBillingSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_DELETE_PAYMENT_BILLING_SUCCESS,
      payload: data
    };
  }
  return { type: types.SFA_DELETE_PAYMENT_BILLING_FAILED, payload: data };
}
/** === SFA DELETE COLLECTION FAILED === */
export function sfaDeletePaymentBillingFailed(data) {
  return { type: types.SFA_DELETE_PAYMENT_BILLING_FAILED, payload: data };
}

/**
 * ===========================
 * GET BILLING DETAIL
 * ===========================
 */

/** === SFA GET BILLING DETAIL PROCESS === */
export function sfaGetBillingDetailProcess(data) {
  return { type: types.SFA_GET_BILLING_DETAIL_PROCESS, payload: data };
}

/** === SFA GET BILLING DETAIL SUCCESS === */
export function sfaGetBillingDetailSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_BILLING_DETAIL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_BILLING_DETAIL_FAILED, payload: data };
}

/** === SFA GET BILLING DETAIL FAILED === */
export function sfaGetBillingDetailFailed(data) {
  return { type: types.SFA_GET_BILLING_DETAIL_FAILED, payload: data };
}

/**
 * ===========================
 * GET COLLECTION PAYMENT LOG
 * ===========================
 */
/** === SFA LOADMORE BILLING DETAIL PROCESS === */
export function sfaGetPaymentCollectionLogLoadmoreProcess(data) {
  return {
    type: types.SFA_PAYMENT_COLLECTION_LOG_LOADMORE_PROCESS,
    payload: data
  };
}
/** === SFA GET BILLING DETAIL PROCESS === */
export function sfaGetPaymentCollectionLogProcess(data) {
  return { type: types.SFA_GET_PAYMENT_COLLECTION_LOG_PROCESS, payload: data };
}

/** === SFA GET BILLING DETAIL SUCCESS === */
export function sfaGetPaymentCollectionLogSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_PAYMENT_COLLECTION_LOG_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_PAYMENT_COLLECTION_LOG_FAILED, payload: data };
}

/** === SFA GET BILLING DETAIL FAILED === */
export function sfaGetPaymentCollectionLogFailed(data) {
  return { type: types.SFA_GET_PAYMENT_COLLECTION_LOG_FAILED, payload: data };
}

/**
 * ===========================
 * PATCH EDIT COLLECTION METHOD
 * ===========================
 */

/** === SFA PATCH EDIT COLLECTION METHOD PROCESS === */
export function sfaEditCollectionMethodProcess(data) {
  return { type: types.SFA_EDIT_COLLECTION_METHOD_PROCESS, payload: data };
}

/** === SFA PATCH EDIT COLLECTION METHOD SUCCESS === */
export function sfaEditCollectionMethodSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_EDIT_COLLECTION_METHOD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_EDIT_COLLECTION_METHOD_FAILED, payload: data };
}

/** === SFA PATCH EDIT COLLECTION METHOD FAILED === */
export function sfaEditCollectionMethodFailed(data) {
  return { type: types.SFA_EDIT_COLLECTION_METHOD_FAILED, payload: data };
}

/**
 * ===========================
 * DELETE COLLECTION METHOD
 * ===========================
 */
/** === SFA DELETE COLLECTION METHOD PROCESS === */
export function sfaDeleteCollectionMethodProcess(data) {
  return { type: types.SFA_DELETE_COLLECTION_METHOD_PROCESS, payload: data };
}

/** === SFA DELETE COLLECTION METHOD SUCCESS === */
export function sfaDeleteCollectionMethodSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_DELETE_COLLECTION_METHOD_SUCCESS,
      payload: data
    };
  }
  return { type: types.SFA_DELETE_COLLECTION_METHOD_FAILED, payload: data };
}
/** === SFA DELETE COLLECTION METHOD FAILED === */
export function sfaDeleteCollectionMethodFailed(data) {
  return { type: types.SFA_DELETE_COLLECTION_METHOD_FAILED, payload: data };
}

/**
 * ===========================
 * GET COLLECTION LIST STATUS
 * ===========================
 */
/** === SFA GET COLLECTION LIST STATUS PROCESS === */
export function sfaGetCollectionListStatusProcess(data) {
  return { type: types.SFA_GET_COLLECTION_LIST_STATUS_PROCESS, payload: data };
}
/** === SFA GET COLLECTION LIST STATUS SUCCESS === */
export function sfaGetCollectionListStatusSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_COLLECTION_LIST_STATUS_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_COLLECTION_LIST_STATUS_FAILED, payload: data };
}
/** === SFA GET COLLECTION LIST STATUS FAILED === */
export function sfaGetCollectionListStatusFailed(data) {
  return { type: types.SFA_GET_COLLECTION_LIST_STATUS_FAILED, payload: data };
}

/**
 * ==================================
 * SELECTED COLLECTION TRANSACTION
 * ==================================
 */
export function collectionTransactionSelected(data) {
  return { type: types.COLLECTION_SELECTED, payload: data };
}

/**
 * ================================
 * SFA CHECK COLLECTION STATUS
 * ================================
 */
/** === SFA CHECK COLLECTION STATUS === */
export function sfaCheckCollectionStatusProcess(data) {
  return { type: types.SFA_CHECK_COLLECTION_STATUS_PROCESS, payload: data };
}
/** === SFA GET COLLECTION LIST STATUS SUCCESS === */
export function sfaCheckCollectionStatusSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_CHECK_COLLECTION_STATUS_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_CHECK_COLLECTION_STATUS_FAILED, payload: data };
}
/** === SFA GET COLLECTION LIST STATUS FAILED === */
export function sfaCheckCollectionStatusFailed(data) {
  return { type: types.SFA_CHECK_COLLECTION_STATUS_FAILED, payload: data };
}

/**
 * ================================
 * SFA GET REASON NOT TO PAY
 * ================================
 */
/** === SFA GET REASON NOT TO PAY PROCESS === */
export function sfaGetReasonNotToPayProcess(data) {
  return { type: types.SFA_GET_REASON_NOT_TO_PAY_PROCESS, payload: data };
}
/** === SFA REASON NOT TO PAY SUCCESS === */
export function sfaGetReasonNotToPaySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_REASON_NOT_TO_PAY_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_REASON_NOT_TO_PAY_FAILED, payload: data };
}
/** === SFA REASON NOT TO PAY FAILED === */
export function sfaGetReasonNotToPayFailed(data) {
  return { type: types.SFA_GET_REASON_NOT_TO_PAY_FAILED, payload: data };
}

/**
 * ===========================
 * POST TRANSACTION CHECKOUT
 * ===========================
 */
/** === SFA POST PAYMENT METHOD PROCESS === */
export function sfaPostTransactionCheckoutProcess(data) {
  return { type: types.SFA_POST_TRANSACTION_CHECKOUT_PROCESS, payload: data };
}

/** === SFA POST PAYMENT METHOD SUCCESS === */
export function sfaPostTransactionCheckoutSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_POST_TRANSACTION_CHECKOUT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_POST_TRANSACTION_CHECKOUT_FAILED, payload: data };
}
/** === SFA POST PAYMENT METHOD FAILED === */
export function sfaPostTransactionCheckoutFailed(data) {
  return { type: types.SFA_POST_TRANSACTION_CHECKOUT_FAILED, payload: data };
}

export function sfaPostTransactionCheckoutReset() {
  return { type: types.SFA_POST_TRANSACTION_CHECKOUT_RESET };
}

/**
 * ===========================
 * GET RETURN BALANCE
 * ===========================
 */
/** === SFA GET RETURN BALANCE PROCESS === */
export function sfaGetReturnBalanceProcess(data) {
  return { type: types.SFA_GET_RETURN_BALANCE_PROCESS, payload: data };
}

/** === SFA GET RETURN BALANCE SUCCESS === */
export function sfaGetReturnBalanceSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_RETURN_BALANCE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_RETURN_BALANCE_FAILED, payload: data };
}
/** === SFA GET RETURN BALANCE FAILED === */
export function sfaGetReturnBalanceFailed(data) {
  return { type: types.SFA_GET_RETURN_BALANCE_FAILED, payload: data };
}

/**
 * ===========================
 * GET STORE COLLECTION LIST
 * ===========================
 */
/** === SFA GET STORE COLLECTION LIST PROCESS === */
export function sfaGetStoreCollectionListProcess(data) {
  return { type: types.SFA_GET_STORE_COLLECTION_LIST_PROCESS, payload: data };
}

/** === SFA GET STORE COLLECTION LIST SUCCESS === */
export function sfaGetStoreCollectionListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_STORE_COLLECTION_LIST_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_STORE_COLLECTION_LIST_FAILED, payload: data };
}
/** === SFA GET STORE COLLECTION LIST FAILED === */
export function sfaGetStoreCollectionListFailed(data) {
  return { type: types.SFA_GET_STORE_COLLECTION_LIST_FAILED, payload: data };
}

/** === SFA GET STORE COLLECTION LIST RESET === */
export function sfaGetStoreCollectionListReset() {
  return { type: types.SFA_GET_STORE_COLLECTION_LIST_RESET };
}

/** === SELECTED STORE === */
export function selectedStore(data) {
  return { type: types.SELECTED_STORE, payload: data };
}
/** === SELECTED STORE RESET === */
export function selectedStoreReset() {
  return { type: types.SELECTED_STORE_RESET };
}
/** === REFRESH GET STORE COLLECTION LIST === */
export function sfaGetStoreCollectionListRefresh() {
  return { type: types.SFA_GET_STORE_COLLECTION_LIST_REFRESH };
}
/** === LOAD MORE GET STORE COLLECTION LIST === */
export function sfaGetStoreCollectionListLoadmore(data) {
  return { type: types.SFA_GET_STORE_COLLECTION_LIST_LOADMORE, payload: data };
}
/** === MODAL COLLECTION LIST MENU === */
export function sfaModalCollectionListMenu(data) {
  return { type: types.SFA_MODAL_COLLECTION_LIST_MENU, payload: data };
}
/** === SFA GET STORE COLLECTION STATUS PROCESS === */
export function sfaStoreCollectionStatusProcess(data) {
  return { type: types.SFA_STORE_COLLECTION_STATUS_PROCESS, payload: data };
}

/** === SFA GET STORE COLLECTION STATUS SUCCESS === */
export function sfaStoreCollectionStatusSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_STORE_COLLECTION_STATUS_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_STORE_COLLECTION_STATUS_FAILED, payload: data };
}
/** === SFA GET STORE COLLECTION STATUS FAILED === */
export function sfaStoreCollectionStatusFailed(data) {
  return { type: types.SFA_STORE_COLLECTION_STATUS_FAILED, payload: data };
}

/** === SFA GET STORE COLLECTION STATUS RESET === */
export function sfaStoreCollectionStatusReset() {
  return { type: types.SFA_STORE_COLLECTION_STATUS_RESET };
}
