import ApiRest from '../apiRest';

function getJourneyPlan(data) {
  return ApiRest({
    path: `journey-plan-list?$skip=${data.page}&$limit=10`,
    method: 'GET'
  });
}

function saveMerchantToJourneyPlan(data) {
  return ApiRest({
    path: `journey-plan-list?storeType=${data.storeType}`,
    method: 'POST',
    params: data.body
  });
}

export const JourneyMethod = {
  getJourneyPlan,
  saveMerchantToJourneyPlan
};
