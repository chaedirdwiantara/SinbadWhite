import ApiRest from '../apiRest';

function getLocation(data) {
  /**
   * PROPS
   * data.type = 'province' / 'city' / 'distric' / 'urban' / 'hierarchyMerchant' / 'clusterMerchant' / 'typeMerchant' / 'groupMerchant' / 'segmentMerchant'
   * data.provinceId = string (if data.type === 'city')
   * data.cityName = string (if data.type === 'distric')
   * data.districName = string (if data.type === 'urban')
   * data.page = for pagination (all type)
   * data.search = for search keyword (all type)
   */
  let getLocationApi = '';
  switch (data.type) {
    case 'province':
      getLocationApi = 'provinces?';
      break;
    case 'city':
      getLocationApi = `locations?type=city&provinceId=${data.provinceId}&`;
      break;
    case 'distric':
      getLocationApi = `locations?type=district&city=${data.cityName}&`;
      break;
    case 'urban':
      getLocationApi = `locations?type=urban&district=${data.districName}&`;
      break;
    case 'hierarchyMerchant':
      getLocationApi = 'hierarchies?';
      break;
    case 'clusterMerchant':
      getLocationApi = 'clusters?';
      break;
    case 'typeMerchant':
      getLocationApi = 'store-types?';
      break;
    case 'groupMerchant':
      getLocationApi = 'store-groups?';
      break;
    case 'suplierMerchant':
      getLocationApi = `suppliers?userId=${data.userId}&`;
      break;
    case 'segmentMerchant':
      getLocationApi = 'store-segments?';
      break;
    default:
      break;
  }
  return ApiRest({
    path: `${getLocationApi}$skip=${data.page}&$limit=20&keyword=${data.search}`,
    method: 'GET'
  });
}

export const GlobalMethod = {
  getLocation
};
