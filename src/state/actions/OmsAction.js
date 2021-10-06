import * as types from '../types';
import { Store } from '../Store';
/**
 * ====================================
 * DELETE ALL DATA IN OMS
 * ====================================
 */
export function omsResetData() {
  return { type: types.OMS_RESET_DATA };
}
/**
 * =================================
 * ADD CHECKOUT ITEM
 * =================================
 */
export function omsCheckoutItem(data) {
  return { type: types.OMS_CHECKOUT_ITEM, payload: data };
}
/**
 * =================================
 * MODIFY CHECK LIST ITEM
 * =================================
 */
export function omsCheckListCart(data) {
  return { type: types.OMS_CHECKLIST_ITEM_CART, payload: data };
}
/**
 * ====================================
 * GET CART ITEM
 * ====================================
 */
/** === CART ITEM PROCESS === */
export function omsGetCartItemProcess(data) {
  return { type: types.OMS_GET_CART_ITEM_PROCESS, payload: data };
}
/** === CART ITEM SUCCESS === */
export function omsGetCartItemSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OMS_GET_CART_ITEM_SUCCESS, payload: data.data };
  }
  return { type: types.OMS_GET_CART_ITEM_FAILED, payload: data };
}
/** === CART ITEM FAILED === */
export function omsGetCartItemFailed(data) {
  return { type: types.OMS_GET_CART_ITEM_FAILED, payload: data };
}
/**
 * ====================================
 * GET CART ITEM FROM CHECKOUT
 * ====================================
 */
/** === CART ITEM PROCESS === */
export function omsGetCartItemFromCheckoutProcess(data) {
  return { type: types.OMS_GET_CART_ITEM_FROM_CHECKOUT_PROCESS, payload: data };
}
/** === CART ITEM SUCCESS === */
export function omsGetCartItemFromCheckoutSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_GET_CART_ITEM_FROM_CHECKOUT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_GET_CART_ITEM_FROM_CHECKOUT_FAILED, payload: data };
}
/** === CART ITEM FAILED === */
export function omsGetCartItemFromCheckoutFailed(data) {
  return { type: types.OMS_GET_CART_ITEM_FROM_CHECKOUT_FAILED, payload: data };
}
/**
 * ===========================
 * CONFIRM ORDER
 * ===========================
 */
/** === CONFIRM ORDER PROCESS === */
export function omsConfirmOrderProcess(data) {
  return { type: types.OMS_CONFIRM_ORDER_PROCESS, payload: data };
}
/** === CONFIRM ORDER SUCCESS === */
export function omsConfirmOrderSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OMS_CONFIRM_ORDER_SUCCESS, payload: data.data };
  }
  return { type: types.OMS_CONFIRM_ORDER_FAILED, payload: data };
}
/** === CONFIRM ORDER FAILED === */
export function omsConfirmOrderFailed(data) {
  return { type: types.OMS_CONFIRM_ORDER_FAILED, payload: data };
}
/**
 * ===========================
 * CHECKOUT ITEM
 * ===========================
 */
/** === CHECKOUT ITEM PROCESS === */
export function omsGetCheckoutItemProcess(data) {
  return { type: types.OMS_GET_CHECKOUT_ITEM_PROCESS, payload: data };
}
/** === CHECKOUT ITEM SUCCESS === */
export function omsGetCheckoutItemSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OMS_GET_CHECKOUT_ITEM_SUCCESS, payload: data.data };
  }
  return { type: types.OMS_GET_CHECKOUT_ITEM_FAILED, payload: data };
}
/** === CHECKOUT ITEM FAILED === */
export function omsGetCheckoutItemFailed(data) {
  return { type: types.OMS_GET_CHECKOUT_ITEM_FAILED, payload: data };
}
/** === REPLACE CHECKOUT ITEM === */
export function omsReplaceCheckoutItem(data) {
  return { type: types.OMS_REPLACE_CHECKOUT_ITEM, payload: data };
}

/**
 * ===========================
 * DELETE CART ITEM
 * ===========================
 */
/** === CHECKOUT CART ITEM PROCESS === */
export function omsDeleteCartItemProcess(data) {
  return { type: types.OMS_DELETE_CART_ITEM_PROCESS, payload: data };
}
/** === CHECKOUT CART ITEM SUCCESS === */
export function omsDeleteCartItemSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OMS_DELETE_CART_ITEM_SUCCESS, payload: data.data };
  }
  return { type: types.OMS_DELETE_CART_ITEM_FAILED, payload: data };
}
/** === CHECKOUT CART ITEM FAILED === */
export function omsDeleteCartItemFailed(data) {
  return { type: types.OMS_DELETE_CART_ITEM_FAILED, payload: data };
}
/**
 * ===========================
 * DELETE CART ITEM
 * ===========================
 */
/** === GET PAYMENT PROCESS === */
export function omsGetPaymentProcess(data) {
  return { type: types.OMS_GET_PAYMENT_PROCESS, payload: data };
}
/** === GET PAYMENT SUCCESS === */
export function omsGetPaymentSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OMS_GET_PAYMENT_SUCCESS, payload: data.data };
  }
  return { type: types.OMS_GET_PAYMENT_FAILED, payload: data };
}
/** === GET PAYMENT FAILED === */
export function omsGetPaymentFailed(data) {
  return { type: types.OMS_GET_PAYMENT_FAILED, payload: data };
}
/**
 * ==============================
 * ADD TO CART GLOBAL
 * ==============================
 */
/** === ADD TO CART GLOBAL ==== */
/**
 * ==============================
 * ADD TO CART
 * ==============================
 */
export function omsAddToCart(data) {
  const allPropsData = Store.getState();
  const dataCart = allPropsData.oms.dataCart;
  const dataCheckBoxlistCart = allPropsData.oms.dataCheckBoxlistCart;
  /**
   * ===============================================================
   * fungsi ini untuk delete product yang ada di data checklist box
   * ===============================================================
   */
  if (dataCheckBoxlistCart.length > 0) {
    if (data.method === 'delete') {
      const indexDataCheckBoxlistCart = dataCheckBoxlistCart.findIndex(
        itemDataCheckBoxlistCart =>
          parseInt(itemDataCheckBoxlistCart.catalogue.id, 10) ===
          data.catalogueId
      );
      if (indexDataCheckBoxlistCart > -1) {
        dataCheckBoxlistCart.splice(indexDataCheckBoxlistCart, 1);
        return {
          type: types.OMS_CHECKLIST_ITEM_CART,
          payload: dataCheckBoxlistCart
        };
      }
    }
  }
  /** =============================================================== */
  if (allPropsData.oms.dataCart.length > 0) {
    const indexDataCart = dataCart.findIndex(
      itemCart => itemCart.catalogueId === parseInt(data.catalogueId, 10)
    );

    switch (data.method) {
      case 'add':
        if (indexDataCart > -1) {
          dataCart[indexDataCart].qty = data.qty;
        } else {
          dataCart.push({
            catalogueId: parseInt(data.catalogueId, 10),
            qty: data.qty
          });
        }
        break;
      case 'update':
        dataCart[indexDataCart].qty = data.qty;
        break;
      case 'delete':
        dataCart.splice(indexDataCart, 1);
        break;
      default:
        break;
    }
  } else {
    dataCart.push({
      catalogueId: parseInt(data.catalogueId, 10),
      qty: data.qty
    });
  }
  return { type: types.OMS_ITEM_FOR_CART, payload: dataCart };
}

/**
 * ====================================
 * GET PAYMENT CHANNEL
 * ====================================
 */
/** === GET PAYMENT CHANNEL PROCESS === */
export function OmsGetPaymentChannelProcess(data) {
  return { type: types.OMS_GET_PAYMENT_CHANNEL_PROCESS, payload: data };
}

/** === GET PAYMENT CHANNEL SUCCESS === */
export function OmsGetPaymentChannelSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_GET_PAYMENT_CHANNEL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_GET_PAYMENT_CHANNEL_FAILED, payload: data };
}

/** === GET PAYMENT CHANNEL FAILED === */
export function OmsGetPaymentChannelFailed(data) {
  return { type: types.OMS_GET_PAYMENT_CHANNEL_FAILED, payload: data };
}

/**
 * ====================================
 * GET TERMS AND CONDITONS
 * ====================================
 */
/** === GET TERMS AND CONDITONS PROCESS === */
export function OmsGetTermsConditionsProcess(data) {
  return { type: types.OMS_GET_TERMS_CONDITIONS_PROCESS, payload: data };
}

/** === GET TERMS AND CONDITONS SUCCESS === */
export function OmsGetTermsConditionsSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_GET_TERMS_CONDITIONS_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_GET_TERMS_CONDITIONS_FAILED, payload: data };
}

/** === GET TERMS AND CONDITONS FAILED === */
export function OmsGetTermsConditionsFailed(data) {
  return { type: types.OMS_GET_TERMS_CONDITIONS_FAILED, payload: data };
}

/**
 * ===========================
 * LAST PAYMENT CHANNEL
 * ===========================
 */
/** === GET LAST PAYMENT CHANNEL SUCCESS === */
export function omsGetLastPaymentChannelProcess(data) {
  return { type: types.OMS_GET_LAST_PAYMENT_CHANNEL_PROCESS, payload: data };
}

/** === GET LAST PAYMENT CHANNEL SUCCESS === */
export function omsGetLastPaymentChannelSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_GET_LAST_PAYMENT_CHANNEL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_GET_LAST_PAYMENT_CHANNEL_FAILED, payload: data };
}

/** === GET LAST PAYMENT CHANNEL FAILED === */
export function omsGetLastPaymentChannelFailed(data) {
  return { type: types.OMS_GET_LAST_PAYMENT_CHANNEL_FAILED, payload: data };
}

/**
 * ===========================
 * CHECK PROMO
 * ===========================
 */
/** === CHECK PROMO PROCESS === */
export function omsCheckPromoProcess(data) {
  return { type: types.OMS_CHECK_PROMO_PROCESS, payload: data };
}
/** === CHECK PROMO SUCCESS === */
export function omsCheckPromoSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_CHECK_PROMO_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_CHECK_PROMO_FAILED, payload: data };
}
/** === CHECK PROMO FAILED === */
export function omsCheckPromoFailed(data) {
  return { type: types.OMS_CHECK_PROMO_FAILED, payload: data };
}

/**
 * ===========================
 * GET PAY LATER TYPE
 * ===========================
 */
/** === GET PAY LATER TYPE PROCESS === */
export function omsGetPayLaterTypeProcess(data) {
  return { type: types.OMS_GET_PAY_LATER_TYPE_PROCESS, payload: data };
}

/** === GET PAY LATER TYPE SUCCESS === */
export function omsGetPayLaterTypeSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_GET_PAY_LATER_TYPE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_GET_PAY_LATER_TYPE_FAILED, payload: data };
}
/** === GET PAY LATER TYPE FAILED === */
export function omsGetPayLaterTypeFailed(data) {
  return { type: types.OMS_GET_PAY_LATER_TYPE_FAILED, payload: data };
}

/**
 * ====================================
 * GET APPLICABLE PAYLATER
 * ====================================
 */
/** === GET APPLICABLE PAYLATER PROCESS === */
export function OmsApplicablePaylaterProcess(data) {
  return { type: types.OMS_APPLICABLE_PAYLATER_PROCESS, payload: data };
}

/** === GET APPLICABLE PAYLATER SUCCESS === */
export function OmsApplicablePaylaterSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_APPLICABLE_PAYLATER_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_APPLICABLE_PAYLATER_FAILED, payload: data };
}

/** === GET APPLICABLE PAYLATER FAILED === */
export function OmsApplicablePaylaterFailed(data) {
  return { type: types.OMS_APPLICABLE_PAYLATER_FAILED, payload: data };
}

/**
 * ====================================
 * GET OMS KUR OTP
 * ====================================
 */
/** === GET OMS KUR OTP PROCESS === */
export function OmsGetKurOtpProcess(data) {
  return { type: types.OMS_GET_KUR_OTP_PROCESS, payload: data };
}

/** === GET OMS KUR OTP SUCCESS === */
export function OmsGetKurOtpSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_GET_KUR_OTP_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_GET_KUR_OTP_FAILED, payload: data };
}

/** === GET OMS KUR OTP FAILED === */
export function OmsGetKurOtpFailed(data) {
  return { type: types.OMS_GET_KUR_OTP_FAILED, payload: data };
}

/**
 * ====================================
 * POST OMS KUR CONSENT
 * ====================================
 */
/** === POST OMS KUR CONSENT PROCESS === */
export function OmsPostKurConsentProcess(data) {
  return { type: types.OMS_POST_KUR_CONSENT_PROCESS, payload: data };
}

/** === POST OMS KUR CONSENT SUCCESS === */
export function OmsPostKurConsentSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.OMS_POST_KUR_CONSENT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.OMS_POST_KUR_CONSENT_FAILED, payload: data };
}

/** === POST OMS KUR CONSENT FAILED === */
export function OmsPostKurConsentFailed(data) {
  return { type: types.OMS_POST_KUR_CONSENT_FAILED, payload: data };
}

/**
 * =================
 * GET RETURN DRAFT
 * =================
 */
export function GetReturnDraftProcess(data) {
  return { type: types.GET_RETURN_DRAFT_PROCESS, payload: data };
}

export function GetReturnDraftSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.GET_RETURN_DRAFT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.GET_RETURN_DRAFT_FAILED, payload: data };
}

export function GetReturnDraftFailed(data) {
  return { type: types.GET_RETURN_DRAFT_FAILED, payload: data };
}

export function SaveReturnDraftParcelId(data) {
  return { type: types.SAVE_RETURN_DRAFT_PARCEL_ID, payload: data };
}

/**
 * ===================
 * GET RETURN REASON
 * ===================
 */
export function GetReturnReasonProcess(data) {
  return { type: types.GET_RETURN_REASON_PROCESS, payload: data };
}
export function GetReturnReasonSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.GET_RETURN_REASON_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.GET_RETURN_REASON_FAILED, payload: data };
}
export function GetReturnReasonFailed(data) {
  return { type: types.GET_RETURN_REASON_FAILED, payload: data };
}

/**
 * =====================
 * POST RETURN ORDER
 * =====================
 */
export function PostReturnOrderProcess(data) {
  return { type: types.POST_RETURN_ORDER_PROCESS, payload: data };
}

export function PostReturnOrderSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.POST_RETURN_ORDER_SUCCESS, payload: data };
  }
  return { type: types.POST_RETURN_ORDER_FAILED, payload: data };
}

export function PostReturnOrderFailed(data) {
  return { type: types.POST_RETURN_ORDER_FAILED, payload: data };
}
