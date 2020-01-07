import ApiRest from '../apiRest';

function getLocation(data) {
  /**
   * PROPS
   * data.type = 'province' / 'city' / 'distric' / 'urban'
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
    default:
      break;
  }
  console.log(
    `${getLocationApi}$skip=${data.page}&$limit=20&keyword=${data.search}`
  );
  return ApiRest({
    path: `${getLocationApi}$skip=${data.page}&$limit=20&keyword=${data.search}`,
    method: 'GET'
  });
}

export const GlobalMethod = {
  getLocation
};
