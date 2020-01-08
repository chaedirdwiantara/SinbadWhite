import ApiRest from '../apiRest';

function getCartItem(data) {
  return ApiRest({
    path: 'add-cart',
    method: 'POST',
    params: {
      storeId: data.storeId,
      cartId: null,
      catalogues: data.catalogues
    }
  });
}

export const OmsMethod = {
  getCartItem
};
