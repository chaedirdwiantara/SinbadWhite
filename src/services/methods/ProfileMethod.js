import ApiRest from '../apiRest';
/** === EDIT Profile === */
function editProfile(data) {
  return ApiRest({
    path: `agents/${data.agentId}`,
    method: 'PATCH',
    params: data.params
  });
}

function getWarehouse(data){
  return ApiRest({
    path: `sales-warehouses?$skip=0&$limit=20`,
    method: 'GET'
  })
}

function getSalesSegementationTeam(data){
  return ApiRest({
    path: `sales-segmentation/${data}`,
    method: 'GET'
  })
}

function getPrivileges(supplierId){
  return ApiRest({
    path: `privileges?type=agent-app&supplierId=${supplierId}`,
    method: 'GET'
  })
}

export const ProfileMethod = {
  editProfile,
  getWarehouse,
  getSalesSegementationTeam,
  getPrivileges
};
