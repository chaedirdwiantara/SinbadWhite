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
    path: `${salesManagementService}/v1/agent/last_order/${storeId}`,
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
/** === GET LATEST CHECK IN AND CHECK OUT === */
function getLatestCheckInOut() {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book/lastcheckin`,
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
/** === GET NO VISIT REASON === */
function getNoVisitReason() {
  return ApiRest({
    path: `${salesManagementService}/v1/no-visit-reason`,
    method: 'GET'
  });
}
/** === POST NO VISIT REASON === */
function postNoVisitReason(data) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-stores/${
      data.journeyBookStoreId
    }/notvisitstore`,
    method: 'POST',
    params: data.data
  });
}
/** === GET DETAIL JOURNEY BOOK  === */
function getJourneyBookDetail(journeyBookStoreId) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-stores/${journeyBookStoreId}`,
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
/** GET TOTAL SURVEY */
function getTotalSurvey(storeId) {
  return ApiRest({
    path: `supplier/service-survey/v1/surveys/totaltoday/mobile?storeId=${storeId}`,
    method: 'GET'
  });
}
/** GET SURVEY BY ID */
function getSurvey(params) {
  return ApiRest({
    path: `supplier/service-survey/v1/surveys/withresponse/${params.id}${
      params.responseId
    }`,
    method: 'GET'
  });
}
/** GET SURVEY BRAND BY SURVEY ID */
function getSurveyBrand(id) {
  return ApiRest({
    path: `supplier/service-survey/v1/brands/survey/${id}`,
    method: 'GET'
  });
}
/** GET SURVEY RESPONSE */
function getSurveyResponse(id) {
  return ApiRest({
    path: `supplier/service-survey/v1/survey/response/${id}`,
    method: 'GET'
  });
}
/** SUBMIT SURVEY RESPONSE */
function submitSurveyResponse(params) {
  return ApiRest({
    path: 'supplier/service-survey/v1/survey/response',
    method: 'POST',
    params
  });
}
/** UPDATE SURVEY RESPONSE */
function updateSurveyResponse({ params, surveyResponseId }) {
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
function getSalesSegmentation({ type, supplierId, urbanId }) {
  if (urbanId) {
    const params = { urbanId, supplierId };
    return ApiRest({
      path: 'validate-urban-segmentation',
      method: 'POST',
      params
    });
  }
  return ApiRest({
    path: `sales-segmentation?type=${type}&supplierId=${supplierId}`,
    method: 'GET'
  });
}
/** GET RETURN ACTIVE INFO */
function getReturnActiveInfo(data) {
  return ApiRest({
    path: 'check-return-is-active',
    method: 'GET'
  });
}

/** GET RADIUS LOCK GEOTAG */
function getRadiusLockGeotag(params) {
  return ApiRest({
    path: `${salesManagementService}/v1/agent/lockgeotag/validate?storeLong=${
      params.storeLong
    }&storeLat=${params.storeLat}&salesLong=${params.salesLong}&salesLat=${
      params.salesLat
    }`,
    method: 'GET'
  });
}

/** CHECK CAN RESUME VISIT JBS */
function checkCanResumeVisit(params) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book/check-resume/${params.journeyBookId}?jbsId=${
      params.journeyBookStoreId
    }`,
    method: 'GET'
  });
}

/** PAUSE OR RESUME VISIT JBS */
function pauseResumeVisit({ journeyBookStoreId, params }) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-stores/pause-resume/${journeyBookStoreId}`,
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
function addRecordStock(data) {
  const storeId = GlobalMethod.merchantStoreId();
  const supplierId = GlobalMethod.userSupplierMapping();
  return ApiRest({
    path: 'stock-record',
    method: 'POST',
    params: {
      storeId: parseInt(storeId),
      supplierId: parseInt(supplierId[0]),
      catalogues: data.catalogues
    }
  });
}
/** GET RECORD STOCK */
function getRecordStock(data) {
  const storeId = GlobalMethod.merchantStoreId();
  const supplierId = GlobalMethod.userSupplierMapping();
  const keywordSearch = data.search ? data.search : '';
  return ApiRest({
    path: `stock-record?supplierId=${supplierId}&storeId=${storeId}&keyword=${keywordSearch}`,
    method: 'GET'
  });
}
/** DELETE RECORD STOCK */
function deleteRecordStock(id) {
  return ApiRest({
    path: `stock-record/${id}`,
    method: 'DELETE'
  });
}

/** UPDATE RECORD STOCK */
function updateRecordStock(params) {
  return ApiRest({
    path: 'update-stock-record',
    method: 'POST',
    params
  });
}
/** BATCH DELETE RECORD STOCK */
function batchDeleteRecordStock(params) {
  return ApiRest({
    path: 'delete-stock-record',
    method: 'POST',
    params
  });
}
/** GET MERCHANT CREDIT LIMIT LIST */
function getMerchantCreditLimitList(params) {
  return ApiRest({
    path: `payment/v1/credit-limit-stores?supplierId=${
      params.supplierId
    }&storeId=${params.storeId}&limit=${params.limit}&skip=${params.skip}`,
    method: 'GET'
  });
}

/** GET MERCHANT CREDIT LIMIT SUMMARY */
function getMerchantCreditLimitSummary(params) {
  return ApiRest({
    path: `payment/v1/credit-limit-store-summary/${params.storeId}/${
      params.supplierId
    }`,
    method: 'GET'
  });
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
  getLatestCheckInOut,
  getNoOrderReason,
  getNoVisitReason,
  postNoVisitReason,
  getJourneyBookDetail,
  getStoreStatus,
  getWarehouse,
  getSurveyList,
  getTotalSurvey,
  getSurvey,
  getSurveyBrand,
  getSurveyResponse,
  addRecordStock,
  getRecordStock,
  deleteRecordStock,
  updateRecordStock,
  batchDeleteRecordStock,
  submitSurveyResponse,
  updateSurveyResponse,
  validateAreaMapping,
  getSalesSegmentation,
  getReturnActiveInfo,
  getRadiusLockGeotag,
  checkCanResumeVisit,
  pauseResumeVisit,
  getMerchantCreditLimitList,
  getMerchantCreditLimitSummary
};

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: raka
 * updatedDate: 26012022
 * updatedFunction:
 * -> add endpoint mock check resume visit. (journey book stores)
 * -> add endpoint pause or resume visit. (journey book stores)
 */
