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

function getSalesTeam(data){
  return ApiRest({
    path: `supplier/sales-management/v1/sales-teams/sales`,
    method: 'GET'
  });
}

export const ProfileMethod = {
  editProfile,
  getWarehouse,
  getSalesSegementationTeam,
  getSalesTeam,
};


/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 11062021
 * updatedFunction:
 * -> add function to get sales team
 */
