import ApiRest from '../apiRest';
const salesManagementService = 'supplier/sales-management';
/** GET JOURNEY PLAN LIST BY USER ID V2*/
function getJourneyPlanV2(data) {
  let length = 10;
  if (data.length) {
    length = data.length;
  }
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book-stores/date?date=${
      data.date
    }&search=${data.search}&page=${data.page}&length=${length}&storetype=${
      data.storetype
    }`,
    method: 'GET'
  });
}
/** ADD MERCHANT TO JOURNEY PLAN V2 */
function saveMerchantToJourneyPlanV2(data) {
  return ApiRest({
    path: `${salesManagementService}/v1/journey-book`,
    method: 'POST',
    params: data
  });
}
/** GET JOURNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER V2 */
function getJourneyPlanReportV2() {
  return ApiRest({
    path: `${salesManagementService}/v1/agent/journey-book-reports`,
    method: 'GET'
  });
}

export const JourneyMethod = {
  getJourneyPlanV2,
  saveMerchantToJourneyPlanV2,
  getJourneyPlanReportV2
};

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 12082021
 * updatedFunction:
 *  -> add parameter get journey plan (storetype).
 * */
