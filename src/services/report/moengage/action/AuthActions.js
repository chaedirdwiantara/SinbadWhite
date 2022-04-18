import * as EventName from '../event';
import * as Auth from '../record/AuthRecords';
import { Store } from '../../../../state/Store';

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

function recordRegisterStep(screen) {
  const {
    merchant: { dataMerchantVolatile }
  } = Store.getState();
  const data = {};
  console.log('Merchant Volatile', dataMerchantVolatile);
  switch (screen) {
    case 'AddMerchantStep1':
      console.log('Step 1');
      data.owner_mobile_number = dataMerchantVolatile.phone;
      data.screen = 'SRRegisterStoreStep1';
      break;

    default:
      break;
  }

  const props = {
    eventName: EventName.REGISTER_NEW_STORE,
    data
  };
  Auth.trackUserRegister(props);
}

export { recordLogin, recordLogout, recordRegisterStep };
