import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';
const salesManagementService = 'supplier/sales-management';

/** === MERCHANT LIST BY PORTFOLIO V2 === */
function getMerchantV2(data) {
  return ApiRest({
    path: `${salesManagementService}/v1/agent/supplier-stores?search=${
      data.search
    }`,
    method: 'GET'
  });
}
/** === MERCHANT LIST BY PORTFOLIO EXCLUDE STORE ON JOURNEY PLAN === */
function getMerchantExisting(data) {
  return ApiRest({
    path: `${salesManagementService}/v1/agent/journey-book/stores/existing?date=${
      data.date
    }&search=${data.search}`,
    method: 'GET'
  });
}
/** === MERCHANT DETAIL V2 === */
function getMerchantDetailV2(id) {
  return ApiRest({
    path: `supplier-store-profile/${id}`,
    method: 'GET'
  });
}
/** === PORTFOLIO BY USERID V2 === */
function getPortfolioByUserIdV2() {
  return ApiRest({
    path: `${salesManagementService}/v1/agent/portfolios`,
    method: 'GET'
  });
}
/** === ADD MERCHANT === */
function addMerchant(params) {
  return ApiRest({
    path: 'sales-supplier-store',
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
/** === POST ACTIVITY V2 === */
function postActivityV2(params) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-store-logs/activity`,
    method: 'POST',
    params
  });
}
/** === GET LOG ALL ACTIVITY  V2 === */
function getLogAllActivityV2(journeyBookStoreId) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-store-logs/${journeyBookStoreId}/jbs`,
    method: 'GET'
  });
}
/** === GET LOG PER ACTIVITY V2 === */
function getLogPerActivityV2(data) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-store-logs/${
      data.journeyBookStoresId
    }/activity?activity=${data.activity}`,
    method: 'GET'
  });
}
/** === GET NO ORDER REASON === */
function getNoOrderReason() {
  return ApiRest({
    path: `${salesManagementService}/v1/no-order-reason`,
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
/** VALIDATE MAPPING */
function validateAreaMapping(params) {
  return ApiRest({
    path: 'validate-urban-segmentation',
    method: 'POST',
    params
  });
}
/** GET SEGMENTATION LSIT */
function getSalesSegmentation({type, supplierId, urbanId}){
  if(urbanId){
    const params = {urbanId, supplierId}
    return ApiRest({
      path: 'validate-urban-segmentation',
      method: 'POST',
      params
    });
  }
  return ApiRest({
    path: `sales-segmentation?type=${type}&supplierId=${supplierId}`,
    method: 'GET'
  })
}


export const MerchantMethod = {
  getMerchantV2,
  getMerchantExisting,
  getMerchantDetailV2,
  getPortfolioByUserIdV2,
  addMerchant,
  editMerchant,
  getMerchantLastOrder,
  postActivityV2,
  getLogAllActivityV2,
  getLogPerActivityV2,
  getNoOrderReason,
  getStoreStatus,
  getWarehouse,
  getSurveyList,
  getSurveyResponse,
  submitSurvey,
  updateSurvey,
  validateAreaMapping,
  getSalesSegmentation
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
 * updatedBy: dyah
 * updatedDate: 18022021
 * updatedFunction:
 * -> Add new methods. (getMerchantV2, getMerchantDetailV2, getPortfolioByUserIdV2)
 * updatedBy: dyah
 * updatedDate: 22022021
 * updatedFunction:
 * -> Add new methods. (postActivityV2, getLogAllActivityV2, getLogPerActivityV2)
 * updatedBy: dyah
 * updatedDate: 26022021
 * updatedFunction:
 * -> Update the methods. (getNoOrderReason, postActivityV2, getMerchantV2)
 * updatedBy: dyah
 * updatedDate: 08032021
 * updatedFunction:
 * -> Add new method. (getMerchantExisting)
 * updatedBy: dyah
 * updatedDate: 08042021
 * updatedFunction:
 * -> Clean method from old portfolio.
 */
