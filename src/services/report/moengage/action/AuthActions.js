import * as EventName from '../event';
import * as Auth from '../record/AuthRecords';

function recordLogin(data) {
  console.log('Action', data);
  const props = {
    eventName: EventName.LOGIN,
    data
  };

  Auth.trackUserLogin(props);
}

export { recordLogin };
