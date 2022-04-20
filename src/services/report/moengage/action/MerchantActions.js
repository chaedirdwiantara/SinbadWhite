import * as EventName from '../event';
import { Store } from '../../../../state/Store';
import * as MoERecord from '../record';
import { moment } from '../../../../library/thirdPartyPackage';

function recordEnterStore(data) {
  const {
    merchant: { selectedMerchant }
  } = Store.getState();
  if (data.activityName === 'check_in') {
    const neededData = {
      store_id: parseInt(selectedMerchant.storeId, 10),
      store_name: selectedMerchant.storeName,
      sr_inside_store: data.inStore,
      store_available: true,
      time_entered: moment(new Date()).format()
    };

    MoERecord.trackEnterStore({
      eventName: EventName.ENTER_STORE,
      data: neededData
    });
  }
}

export { recordEnterStore };
