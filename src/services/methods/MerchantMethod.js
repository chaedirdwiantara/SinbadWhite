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
/** GET SURVEY LIST */
function getSurveyList(params) {
  return ApiRest({
    path: `supplier/service-survey/v1/survey/mobile?storeId=${
      params.storeId
    }&page=${params.page}&length=${params.length}`,
    method: 'GET'
  });
}
/** GET SURVEY RESPONSE */
function getSurveyResponse(id) {
  return ApiRest({
    path: `supplier/service-survey/v1/survey/response?id=${id}`,
    method: 'GET'
  });
}
/** SUBMIT SURVEY */
function submitSurvey(params) {
  return ApiRest({
    path: 'supplier/service-survey/v1/survey/response',
    method: 'POST',
    params
  });
}
/** UPDATE SURVEY RESPONSE */
function updateSurvey({ params, surveyResponseId }) {
  return ApiRest({
    path: `supplier/service-survey/v1/survey/response/${surveyResponseId}`,
    method: 'PATCH',
    params
  });
}

/**
 * ==================
 * STOCK MANAGEMENT
 * ==================
 */
/** ADD RECORD STOCK */
 function addRecordStock(data){
   const storeId = GlobalMethod.merchantStoreId()
   const supplierId = GlobalMethod.userSupplierMapping()
   return ApiRest({
     path: `stock-record`,
     method: 'POST',
     params: {
      storeId: parseInt(storeId),
      supplierId: parseInt(supplierId[0]),
      catalogues: data.catalogues
    }
   })
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
  getWarehouse,
  getSurveyList,
  getSurveyResponse,
  submitSurvey,
  updateSurvey,
  addRecordStock
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
 * -> Change global method to get userId and supplierId\
 * updatedBy: dyah
 * updatedDate: 27112020
 * updatedFunction:
 * -> Add methods. (get survey list, get survey response, submit survey)
 */
