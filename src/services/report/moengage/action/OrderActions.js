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

function recordViewCart(props) {
  /**
   * Transform Catalogue
   */
  let allCatalogues = [];
  const skuId = [];
  // Mapping Parcels
  props.cartParcels.map((parcelItem, parcelIndex) => {
    // Mapping Brands
    parcelItem.cartBrands.map((brandItem, brandIndex) => {
      // Mapping Catalogues
      brandItem.cartBrandCatalogues.map((brandCatalogue, catalogueIndex) => {
        const skuPrice = Price(brandCatalogue.catalogue);
        const catalogue = {
          sku_name: brandCatalogue.catalogue.name,
          sku_id: brandCatalogue.catalogue.id,
          sku_price: skuPrice,
          supplier_id: brandItem.brand.supplierId,
          supplier_name: brandItem.brand.name,
          sku_qty: brandCatalogue.qty,
          sku_total_price: brandCatalogue.qty * skuPrice
        };
        skuId.push(brandCatalogue.catalogue.id);
        allCatalogues.push(catalogue);
      });
    });
  });

  const data = {
    store_id: storeMapping().storeId,
    store_name: storeMapping().storeName,
    cart_id: parseInt(props.id, 10),
    sku_id: skuId.join(',')
  };

  MoERecord.trackViewCart({ eventName: EventName.VIEW_CART, data });
}

function recordRemoveItemFromCart(props) {
  const {
    oms: { dataOmsGetCartItem }
  } = Store.getState();
  const { catalogueId } = props;

  const data = {
    store_id: storeMapping().storeId,
    store_name: storeMapping().storeName,
    cart_id: dataOmsGetCartItem.id
  };

  const allCatalogues = transformCartParcels(dataOmsGetCartItem);

  const deletedCatalogue = allCatalogues.find(
    item => item.sku_id === catalogueId
  );

  for (var key in deletedCatalogue) {
    if (deletedCatalogue.hasOwnProperty(key)) {
      data[`${key}`] = deletedCatalogue[key];
    }
  }

  MoERecord.trackDeletedSKU({ eventName: EventName.REMOVE_SKU, data });
}

function transformCartParcels(data) {
  /**
   * Transform Catalogue
   */
  const allCatalogues = [];
  // Mapping Parcels
  data.cartParcels.map((parcelItem, parcelIndex) => {
    // Mapping Brands
    parcelItem.cartBrands.map((brandItem, brandIndex) => {
      // Mapping Catalogues
      brandItem.cartBrandCatalogues.map((brandCatalogue, catalogueIndex) => {
        const skuPrice = Price(brandCatalogue.catalogue);
        const catalogue = {
          sku_name: brandCatalogue.catalogue.name,
          sku_id: brandCatalogue.catalogue.id,
          sku_price: skuPrice,
          sku_category: brandCatalogue.catalogue.lastCatalogueCategoryId,
          sku_qty: brandCatalogue.qty,
          sku_total_price: brandCatalogue.qty * skuPrice
        };
        allCatalogues.push(catalogue);
      });
    });
  });

  return allCatalogues;
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

export { recordAddToCart, recordViewCart, recordRemoveItemFromCart };
