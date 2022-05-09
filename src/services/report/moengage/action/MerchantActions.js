import * as EventName from '../event';
import { Store } from '../../../../state/Store';
import * as MoERecord from '../record';
import { moment } from '../../../../library/thirdPartyPackage';

function recordStoreActivity(props) {
  const {
    merchant: { selectedMerchant, dataGetLogAllActivityV2 }
  } = Store.getState();
  if (selectedMerchant !== null) {
    if (props.activityName === 'check_in') {
      const neededData = {
        store_id: parseInt(selectedMerchant.storeId, 10),
        store_name: selectedMerchant.storeName,
        sr_inside_store: props.inStore,
        store_available: true,
        time_entered: moment(new Date()).format()
      };

      MoERecord.trackEnterStore({
        eventName: EventName.ENTER_STORE,
        data: neededData
      });
    }

    if (props.activityName === 'check_out') {
      const dataCheckIn = dataGetLogAllActivityV2.find(
        item => item.activityName === 'check_in'
      );

      const checkInTime = dataCheckIn.createdAt;
      const checkOutTime = moment();
      const data = {
        store_id: storeMapping().storeId,
        store_name: storeMapping().storeName,
        sr_in_store: true,
        sr_visited_store: true,
        time_entered: checkInTime,
        time_exited: moment(new Date()).format(),
        visit_duration: `${checkOutTime.diff(checkInTime, 'minutes')} minutes`
      };

      MoERecord.trackCheckoutStore({ eventName: EventName.EXIT_STORE, data });
    }
  }
}

function storeMapping() {
  const {
    merchant: { selectedMerchant }
  } = Store.getState();

  const data = {
    storeId: parseInt(selectedMerchant.storeId, 10),
    storeName: selectedMerchant.storeName,
    storePhoneNumber: selectedMerchant.ownerMobilePhoneNo,
    storeAddress: `${selectedMerchant.address}, ${
      selectedMerchant.urbans.urban
    }, ${selectedMerchant.urbans.district}, ${selectedMerchant.urbans.city}, ${
      selectedMerchant.urbans.province.name
    }, ${selectedMerchant.urbans.zipCode} `
  };

  return data;
}

export { recordStoreActivity };
