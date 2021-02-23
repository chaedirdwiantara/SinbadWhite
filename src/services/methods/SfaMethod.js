import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';

/** GET ORDER STATUS */
function getCollectionStatus(data) {
    return ApiRest({
      path: 'collection/v1/available-payment-status',
      method: 'GET'
    });
  }

/** GET ORDER STATUS */
function getSfaDetail(data) {
  return ApiRest({
    path: 'collection/v1/order-parcel/3832',
    method: 'GET'
  });
}

  export const SfaMethod = {
    getCollectionStatus,
    getSfaDetail
  };