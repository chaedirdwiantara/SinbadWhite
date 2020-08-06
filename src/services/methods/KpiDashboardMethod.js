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

function getKpiData() {
  return kpiDashboardDummy();
}

export const KpiDashboardMethod = {
  getKpiData
};
