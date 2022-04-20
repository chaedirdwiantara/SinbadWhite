import * as EventName from './event';
import * as MoeAction from './action';

export const toMoengageFromAction = (eventName, data) => {
  switch (eventName) {
    case EventName.LOGIN:
      MoeAction.recordLogin(data);
      break;
    case EventName.LOGOUT:
      MoeAction.recordLogout(data);
      break;
    case EventName.JOURNEY_PLAN:
      MoeAction.recordJourneyPlan(data);
      break;
    case EventName.REGISTER_NEW_STORE:
      MoeAction.recordRegisterStep('AddMerchantStep4', data);
      break;
    case EventName.ENTER_STORE:
      MoeAction.recordEnterStore(data);
      break;
    case EventName.SEARCH_PDP:
      MoeAction.recordSearchPdp(data);
      break;
    case EventName.PDP_DETAIL:
      MoeAction.recordPdpDetail(data);
      break;
    case EventName.ADD_TO_CART:
      MoeAction.recordAddToCart(data);
      break;
    default:
      break;
  }
};
