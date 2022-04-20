import Price from '../../../../functions/Price';
import { Store } from '../../../../state/Store';
import * as EventName from '../event';
import * as MoERecord from '../record';

function recordAddToCart(props) {
  const {
    pdp: { dataDetailPdp }
  } = Store.getState();

  const skuPrice = Price(dataDetailPdp);

  const data = {
    store_id: storeMapping().storeId,
    store_name: storeMapping().storeName,
    sku_name: dataDetailPdp.name,
    sku_id: dataDetailPdp.id,
    sku_price: skuPrice,
    sku_qty: props.qty,
    sku_total_price: props.qty * skuPrice
  };

  MoERecord.trackAddToCart({ eventName: EventName.ADD_TO_CART, data });
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

export { recordAddToCart };
