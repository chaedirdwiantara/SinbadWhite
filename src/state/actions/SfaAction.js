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
 * GET STATUS ORDER
 * ===========================
 */
/** === SFA POST COLLECTION PAYMENT PROCESS === */
export function sfaGetStatusOrderProcess(data) {
  return { type: types.SFA_GET_STATUS_ORDER_PROCESS, payload: data };
}

/** === SFA POST COLLECTION PAYMENT SUCCESS === */
export function sfaGetStatusOrderSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_STATUS_ORDER_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_STATUS_ORDER_FAILED, payload: data };
}
/** === SFA POST COLLECTION PAYMENT FAILED === */
export function sfaGetStatusOrderFailed(data) {
  return { type: types.SFA_GET_STATUS_ORDER_FAILED, payload: data };
}

/**
 * ===========================
 * GET TRANSFER IMAGE
 * ===========================
 */
/** === SFA GET TRANSFER IMAGE PROCESS === */
export function sfaGetTransferImageProcess(data) {
  return { type: types.SFA_GET_TRANSFER_IMAGE_PROCESS, payload: data };
}

/** === SFA GET TRANSFER IMAGE SUCCESS === */
export function sfaGetTransferImageSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SFA_GET_TRANSFER_IMAGE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SFA_GET_TRANSFER_IMAGE_FAILED, payload: data };
}
/** === SFA GET TRANSFER IMAGE FAILED === */
export function sfaGetTransferImageFailed(data) {
  return { type: types.SFA_GET_TRANSFER_IMAGE_FAILED, payload: data };
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