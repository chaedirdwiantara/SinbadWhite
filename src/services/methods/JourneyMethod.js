import ApiRest from '../apiRest';
const salesManagementService = 'supplier/sales-management';
/** GET JOURNEY PLAN LIST BY USER ID */
function getJourneyPlan(data) {
  return ApiRest({
    path: `journey-list?$skip=${data.page}&$limit=10`,
    method: 'GET'
  });
}
/** GET JOURNEY PLAN LIST BY USER ID V2*/
function getJourneyPlanV2(data) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-stores/date?date=${
      data.date
    }&page=${data.page}&length=10`,
    method: 'GET'
  });
}
/** ADD MERCHANT TO JOURNEY PLAN */
function saveMerchantToJourneyPlan(data) {
  return ApiRest({
    path: `journey-plan-list?storeType=${data.storeType}`,
    method: 'POST',
    params: data.body
  });
}
/** ADD MERCHANT TO JOURNEY PLAN */
function saveMerchantToJourneyPlanV2(data) {
  return ApiRest({
    path: `journey-plan-list?storeType=${data.storeType}`,
    method: 'POST',
    params: data.body
  });
}
/** GET JOUNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER */
function getJourneyPlanReport(supplierIds) {
  return ApiRest({
    path: `journey-reports?supplierIds=${JSON.stringify(supplierIds)}`,
    method: 'GET'
  });
}
/** GET JOUNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER V2 */
function getJourneyPlanReportV2(supplierIds) {
  return ApiRest({
    path: `journey-reports?supplierIds=${JSON.stringify(supplierIds)}`,
    method: 'GET'
  });
}

export const JourneyMethod = {
  getJourneyPlan,
  getJourneyPlanV2,
  saveMerchantToJourneyPlan,
  saveMerchantToJourneyPlanV2,
  getJourneyPlanReport,
  getJourneyPlanReportV2
};

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 03072020
 * updatedFunction:
 *  -> Change endpoint getJourneyPlan
 * updatedBy: dyah
 * updatedDate: 18022021
 * updatedFunction:
 * -> Add new methods. (getJourneyPlanV2, saveMerchantToJourneyPlanV2, getJourneyPlanReportV2)
 * */
