import ApiRest from '../apiRest';

function getPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierId=1`,
    method: 'GET'
  });
}

export const PdpMethod = {
  getPdp
};
