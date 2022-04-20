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
    default:
      break;
  }
};
