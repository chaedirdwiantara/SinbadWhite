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
    merchant: { dataMerchantVolatile },
    user
  } = Store.getState();
  const data = {};
  console.log('Merchant Volatile', dataMerchantVolatile);
  switch (screen) {
    case 'AddMerchantStep1':
      data.owner_mobile_number = dataMerchantVolatile.phone;
      data.screen = 'SRRegisterStoreStep1';
      break;
    case 'AddMerchantStep2':
      data.owner_name = dataMerchantVolatile.fullName;
      data.store_name = dataMerchantVolatile.name;
      data.supplier_name = user.userSuppliers[0].supplier.name;
      data.owner_ktp = dataMerchantVolatile.idNo;
      data.owner_npwp = dataMerchantVolatile.taxNo;
      data.screen = 'SRRegisterStoreStep2';
      break;
    case 'AddMerchantStep3':
      data.location_coordinate = `${dataMerchantVolatile.latitude}, ${
        dataMerchantVolatile.longitude
      }`;
      data.store_address = dataMerchantVolatile.address;
      data.address_notes = dataMerchantVolatile.noteAddress;
      data.vehicle_accessibility =
        dataMerchantVolatile.vehicleAccessibilityName;
      data.vehicle_capacity = dataMerchantVolatile.vehicleAccessibilityAmount;
      data.screen = 'SRRegisterStoreStep3';
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
