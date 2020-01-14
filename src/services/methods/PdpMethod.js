import ApiRest from '../apiRest';

function getPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierIds=${JSON.stringify(
      data.supplierId
    )}&searchName=${data.search}&status=active&sort=${data.sort}&sortby=${
      data.sortBy
    }`,
    method: 'GET'
  });
}

export const PdpMethod = {
  getPdp
};
