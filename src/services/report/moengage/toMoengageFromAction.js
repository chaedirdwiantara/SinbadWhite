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
    default:
      break;
  }
};
