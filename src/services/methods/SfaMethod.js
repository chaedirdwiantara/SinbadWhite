import ApiRest from '../apiRest';

// TODO: Remove testpath after integration with real API

/** GET ORDER STATUS */
function getCollectionStatus(data) {
  return ApiRest({
    path: 'collection/v1/available-payment-status',
    method: 'GET'
  });
}

/** GET ORDER STATUS */
function getSfaDetail(orderParcelId) {
  return ApiRest({
    path: `collection/v1/order-parcel/${orderParcelId}`,
    method: 'GET'
  });
}

/** GET INVOICE LIST */
function getCollectionList(data) {
  return ApiRest({
    path: 'collection/v1/order-parcels',
    method: 'POST',
    params: data
  });
}

/** GET COLLECTION LIST */
function getReferenceList(data) {
  const keyword = data.keyword ? `&keyword=${data.keyword}` : '';
  const paymentCollectionTypeId = data.paymentCollectionTypeId
    ? `&paymentCollectionTypeId=${data.paymentCollectionTypeId}`
    : '';
  const approvalStatus = data.approvalStatus
    ? `&approvalStatus=${data.approvalStatus}`
    : '';

  return ApiRest({
    path: `collection/v1/payment-methods?supplierId=${
      data.supplierId
    }&storeId=${data.storeId}&userId=${
      data.userId
    }${paymentCollectionTypeId}${keyword}${approvalStatus}&skip=0&limit=${
      data.limit
    }`,
    method: 'GET'
    // testpath:
    //   'https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-methods'
  });
}

/** GET COLLECTION LIST */
function getPaymentMethod(data) {
  return ApiRest({
    path: `collection/v1/available-payment-methods?supplierId=${
      data.supplierId
    }&storeId=${data.storeId}`,
    method: 'GET'
  });
}

/** GET ALL BANK ACCOUNT */
function getAllBank() {
  return ApiRest({
    path: 'collection/v1/banks',
    method: 'GET'
  });
}

/** GET COLLECTION LIST */
function getBankAccount(data) {
  return ApiRest({
    path: `collection/v1/bank-accounts?orderParcelId=${
      data.orderParcelId
    }&skip=${data.skip}&limit=${data.limit}`,
    method: 'GET'
  });
}

/** POST PAYMENT METHOD */
function postPaymentMethod(data) {
  return ApiRest({
    path: 'collection/v1/payment-method',
    method: 'POST',
    params: data
  });
}

/** POST COLLECTION PAYMENT */
function postCollectionPayment(data) {
  return ApiRest({
    path: 'collection/v1/payment',
    method: 'POST',
    params: data
  });
}

/** GET STAMPS*/
function getStamp(data) {
  return ApiRest({
    path: 'collection/v1/stamps',
    method: 'GET',
    params: data
  });
}

/** GET COLLECTION IMAGE */
function getCollectionImage(id) {
  return ApiRest({
    path: `collection/v1/payment-method/images/${id}`,
    method: 'GET'
    // testpath:
    //   'https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-method/images/133'
  });
}

/** GET PRINCIPAL */
function getPrincipal(data) {
  return ApiRest({
    path: `collection/v1/principals?supplierId=${data.supplierId}&skip=${
      data.skip
    }&limit=${data.limit}&keyword=`,
    method: 'GET'
  });
}

/** GET COLLECTION LOG */
function getCollectionLog(data) {
  return ApiRest({
    path: `collection/v1/payment-billings?storeId=${
      data.storeId
    }&orderParcelId=${data.orderParcelId}&limit=${data.limit}&skip=${
      data.skip
    }`,
    method: 'GET'
  });
}

/** GET COLLECTION DETAIL */
function getCollectionDetail(data) {
  return ApiRest({
    path: `collection/v1/payment-method/${data}`,
    method: 'GET'
    // testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-method/${data}`
  });
}

/** EDIT BILLING PAYMENT */
function editCollectionBilling(data) {
  return ApiRest({
    path: 'collection/v1/payment',
    method: 'PATCH',
    params: data
  });
}

/** DELETE COLLECTION */
function deletePaymentBilling(data) {
  return ApiRest({
    path: `collection/v1/payment/${data.billingId}`,
    method: 'DELETE',
    params: { userId: data.userId }
  });
}

/** GET BILLING DETAIL */
function getBillingDetail(data) {
  return ApiRest({
    path: `collection/v1/payment-billing/${data}`,
    method: 'GET'
    // testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-billing/${data}`
  });
}

/** GET PAYMENT COLLECTION LOG */
function getPaymentCollectionLog(data) {
  return ApiRest({
    path: `collection/v1/payment-billing-collections?paymentCollectionMethodId=${
      data.paymentCollectionMethodId
    }&storeId=${data.storeId}&limit=${data.limit}&skip=${data.skip}&userId=${
      data.userId
    }`,
    method: 'GET'
    // testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-billing-collections?paymentCollectionMethodId=${
    //   data.paymentCollectionMethodId
    // }&limit=${data.limit}&skip=${data.skip}` // TODO: remove me
  });
}

/** EDIT COLLECTION METHOD */
function editCollectionMethod(data) {
  return ApiRest({
    path: 'collection/v1/payment-method',
    method: 'PATCH',
    params: data
  });
}

/** DELETE COLLECTION METHOD */
function deleteCollectionMethod(data) {
  return ApiRest({
    path: `collection/v1/payment-method/${data.collectionId}`,
    method: 'DELETE',
    params: { userId: data.userId }
  });
}

/** GET COLLECTION LIST STATUS */
function getCollectionListStatus() {
  return ApiRest({
    path: 'collection/v1/available-collection-status',
    method: 'GET'
  });
}

/** GET REASON NOT TO PAY LIST */
function getReasonNotToPay() {
  return ApiRest({
    path: 'collection/v1/no-payment-reasons',
    method: 'GET'
  });
}

/** POST TRANSACTION CHECKOUT */
function postTransactionCheckout(data) {
  return ApiRest({
    path: 'collection/v1/transaction-checkout',
    method: 'POST',
    params: data
  });
}

/** GET RETURN BALANCE */
function getReturnBalance(data) {
  return ApiRest({
    path: `/collection/v1/return-balance?storeId=${data.storeId}&supplierId=${
      data.supplierId
    }`,
    method: 'GET'
    // testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/return-balance?storeId=${
    //   data.storeId
    // }&supplierId=${data.supplierId}`
  });
}

export const SfaMethod = {
  getCollectionStatus,
  getSfaDetail,
  getCollectionList,
  getReferenceList,
  getPaymentMethod,
  getAllBank,
  getBankAccount,
  postPaymentMethod,
  postCollectionPayment,
  getStamp,
  getCollectionImage,
  getPrincipal,
  getCollectionLog,
  getCollectionDetail,
  editCollectionBilling,
  deletePaymentBilling,
  getBillingDetail,
  getPaymentCollectionLog,
  editCollectionMethod,
  deleteCollectionMethod,
  getCollectionListStatus,
  getReasonNotToPay,
  postTransactionCheckout,
  getReturnBalance
};
