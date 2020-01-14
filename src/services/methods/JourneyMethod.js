import ApiRest from '../apiRest';
/** GET JOURNEY PLAN LIST BY USER ID */
function getJourneyPlan(data) {
  return ApiRest({
    path: `journey-plan-list?$skip=${data.page}&$limit=10`,
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
/** GET JOUNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER */
function getJourneyPlanReport(supplierIds) {
  return ApiRest({
    path: `journey-reports?supplierIds=${JSON.stringify(supplierIds)}`,
    method: 'GET'
  });
}

export const JourneyMethod = {
  getJourneyPlan,
  saveMerchantToJourneyPlan,
  getJourneyPlanReport
};
