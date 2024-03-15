/* eslint-disable no-prototype-builtins */
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

function recordVerifyOrder(props) {
  let allCatalogues = [];
  const cart_sku = [];

  // Transform Non Promo SKU
  if (props.notPromoSku.length > 0) {
    props.notPromoSku.map(itemCatalogues => {
      const catalogue = {
        sku_name: itemCatalogues.name,
        sku_id: itemCatalogues.id,
        sku_price: itemCatalogues.price,
        sku_qty: itemCatalogues.qty,
        sku_total_price: itemCatalogues.totalPrice
      };
      allCatalogues.push(catalogue);
      cart_sku.push(itemCatalogues.id);
    });
  }

  // Transform Promo SKU
  if (props.promoSku.length > 0) {
    props.promoSku.map(itemCatalogues => {
      const catalogue = {
        sku_name: itemCatalogues.name,
        sku_id: itemCatalogues.id,
        sku_price: itemCatalogues.price,
        sku_qty: itemCatalogues.qty,
        sku_total_price: itemCatalogues.totalPrice
      };

      // Check if SKU have Promo
      if (itemCatalogues.listPromo.length > 0) {
        catalogue.sku_promo_id = itemCatalogues.listPromo
          .map(item => item.id)
          .join(', ');
        catalogue.sku_promo_value = itemCatalogues.listPromo
          .map(item => item.value)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
        catalogue.sku_promo_total = itemCatalogues.listPromo.length;
        catalogue.sku_promo_name = itemCatalogues.listPromo
          .map(item => item.name)
          .join(', ');
      }

      allCatalogues.push(catalogue);
    });
  }

  // Transform Bonus SKU
  let allBonusSku = [];
  const bonus_sku_id = [];
  if (props.bonusSku.length > 0) {
    props.bonusSku.map(itemCatalogue => {
      const catalogue = {
        sku_bonus_name: itemCatalogue.name,
        sku_bonus_id: itemCatalogue.id,
        sku_bonus_qty: itemCatalogue.qty,
        sku_bonus_promo_name: itemCatalogue.promoName
      };

      allBonusSku.push(catalogue);
      bonus_sku_id.push(itemCatalogue.id);
    });
  }

  const data = {
    cart_id: props.cartId,
    total_original_price: props.grandTotalTransaction,
    total_discounted_price: props.grandTotalRebate,
    total_final_price: props.grandTotalTransaction - props.grandTotalRebate,
    sku_cart: cart_sku.join(','),
    bonus_sku_id: bonus_sku_id.join(',')
  };

  MoERecord.trackVerifyOrder({ eventName: EventName.VERIFY_ORDER, data });
}

function recordCheckoutOrder(props) {
  const {
    oms: { dataOmsGetCheckoutItem }
  } = Store.getState();

  const data = {
    cart_id: dataOmsGetCheckoutItem.cartId,
    store_id: storeMapping().storeId,
    store_name: storeMapping().storeName,
    store_phone_number: storeMapping().storePhoneNumber,
    store_address: storeMapping().storeAddress,
    order_id: props.orderParcels[0].orderId,
    order_parcel_id: props.orderParcels.map(item => item.id).join(',')
  };

  MoERecord.trackCheckoutOrder({ eventName: EventName.CHECKOUT_ORDER, data });
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

export {
  recordAddToCart,
  recordViewCart,
  recordRemoveItemFromCart,
  recordVerifyOrder,
  recordCheckoutOrder
};
