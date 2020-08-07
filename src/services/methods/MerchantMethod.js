import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';

/** === MERCHANT LIST === */
function getMerchant(data) {
  return ApiRest({
    path: `agent-stores?type=${data.type}&portfolioId=${
      data.portfolioId
    }&$skip=${data.page}&$limit=10&keyword=${data.search}`,
    method: 'GET'
  });
}
/** === MERCHANT DETAIL === */
function getMerchantDetail(id) {
  return ApiRest({
    path: `supplier-store-profile/${id}`,
    method: 'GET'
  });
}
/** === PORTFOLIO BY USERID === */
function getPortfolioByUserId(userId) {
  return ApiRest({
    path: `portfolios?userId=${userId}&type=group&paginate=false`,
    method: 'GET'
  });
}
/** === ADD MERCHANT === */
function addMerchant(params) {
  return ApiRest({
    path: 'journey-plan-list?storeType=new_store',
    method: 'POST',
    params
  });
}
/** === EDIT MERCHANT === */
function editMerchant(data) {
  return ApiRest({
    path: `supplier-store-profile/${data.id}`,
    method: 'PATCH',
    params: data.params
  });
}
/** === MERCHANT LAST ORDER === */
function getMerchantLastOrder(storeId) {
  return ApiRest({
    path: `journey-reports/${storeId}`,
    method: 'GET'
  });
}
/** === POST ACTIVITY === */
function postActivity(params) {
  return ApiRest({
    path: 'journey-plan-sale-logs',
    method: 'POST',
    params
  });
}
/** === GET LOG ALL ACTIVITY === */
function getLogAllActivity(journeyPlanSaleId) {
  return ApiRest({
    path: `agent-activities?journeyPlanSaleId=${journeyPlanSaleId}`,
    method: 'GET'
  });
}
/** === GET LOG PER ACTIVITY === */
function getLogPerActivity(data) {
  return ApiRest({
    path: `journey-plan-sale-logs?journeyPlanSaleId=${
      data.journeyPlanSaleId
    }&activity=${data.activity}&$limit=1&$skip=0&sort=asc&sortby=created_at`,
    method: 'GET'
  });
}
/** === GET NO ORDER REASON === */
function getNoOrderReason() {
  return ApiRest({
    path: 'no-order-reasons',
    method: 'GET'
  });
}
/** === GET STORE STATUS === */
function getStoreStatus() {
  return ApiRest({
    path: 'store-status',
    method: 'POST',
    params: {
      storeId: GlobalMethod.merchantStoreId(),
      supplierId: GlobalMethod.userSupplierMapping()
    }
  });
}
/** GET WAREHOUSE */
function getWarehouse(urbanId) {
  return ApiRest({
    path: `warehouses?supplierIds=${JSON.stringify(
      GlobalMethod.userSupplierMapping()
    )}&urbanId=${parseInt(urbanId, 10)}`,
    method: 'GET'
  });
}

export const MerchantMethod = {
  getMerchant,
  getMerchantDetail,
  getPortfolioByUserId,
  addMerchant,
  editMerchant,
  getMerchantLastOrder,
  postActivity,
  getLogAllActivity,
  getLogPerActivity,
  getNoOrderReason,
  getStoreStatus,
  getWarehouse
};

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 01072020
 * updatedFunction:
 * -> add fucntion to get store status
 * updatedBy: tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Change global method to get userId and supplierId
 */
