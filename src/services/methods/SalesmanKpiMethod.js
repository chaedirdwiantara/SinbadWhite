import ApiRest from '../apiRest';

const kpiDashboardDummy = () =>
  new Promise(function(resolve) {
    resolve([
      {
        id: 'order',
        data: {
          achieved: 12,
          target: 20
        }
      },
      {
        id: 'sell',
        data: {
          achieved: 2300000,
          target: 4600000
        }
      },
      {
        id: 'visit',
        data: {
          achieved: 12,
          target: 20
        }
      },
      {
        id: 'new',
        data: {
          achieved: 10,
          target: 20
        }
      },
      {
        id: 'orderCreated',
        data: {
          achieved: 10,
          target: 20
        }
      }
    ]);
  });

function getKpiData(data) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/all?startDate=${
      data.startDate
    }&endDate=${data.endDate}&period=${data.period}&userId=${data.userId}`,
    method: 'GET'
  });
}

async function getKpiDataDetail(data) {
  const response = await ApiRest({
    path: `supplier/salesmankpi/v1/mobile/all?startDate=${
      data.startDate
    }&endDate=${data.endDate}&period=${data.period}&userId=${data.userId}`,
    method: 'GET'
  });
  return response;
}

export const SalesmanKpiMethod = {
  getKpiData,
  getKpiDataDetail
};
