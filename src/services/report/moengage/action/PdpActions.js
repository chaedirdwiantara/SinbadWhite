import { Store } from '../../../../state/Store';
import * as EventName from '../event';
import * as MoERecord from '../record';

function recordSearchPdp(props) {
  const {
    pdp: { lastSearchKeyword }
  } = Store.getState();
  const data = {
    store_id: storeMapping().storeId,
    store_name: storeMapping().storeName,
    keyword: lastSearchKeyword,
    is_result_found: props.data.total > 0 ? true : false
  };

  if (lastSearchKeyword !== null && lastSearchKeyword !== '') {
    MoERecord.trackSearchPdp({ eventName: EventName.SEARCH_PDP, data });
  }
}

function storeMapping() {
  const {
    merchant: { selectedMerchant }
  } = Store.getState();

  const data = {
    storeId: parseInt(selectedMerchant.storeId, 10),
    storeName: selectedMerchant.storeName
  };

  return data;
}

export { recordSearchPdp };
