import * as EventName from '../event';
import * as Auth from '../record/AuthRecords';

function recordLogin(data) {
  const props = {
    eventName: EventName.LOGIN,
    data
  };

  Auth.trackUserLogin(props);
}

function recordLogout(data) {
  const props = {
    eventName: EventName.LOGOUT,
    data
  };
  Auth.trackUserLogout(props);
}

export { recordLogin, recordLogout };
