import ApiRest from '../apiRest';

function getPdp(data) {
  let newPath;
  if (data.searchText) {
    newPath = `catalogues?searchName=${data.searchText}&`;
  } else {
    newPath = `catalogues?`;
  }

  return ApiRest({
    path: `${newPath}$skip=${data.page}&$limit=10&supplierId=${parseInt(
      data.supplierId,
      10
    )}`,
    method: 'GET'
  });
}

export const PdpMethod = {
  getPdp
};
