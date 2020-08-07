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

const getKpiDataDetail = async params => {
  console.log('============== params ================');
  console.log(params);
  let response = await fetch(
    'https://cantik-app.herokuapp.com/dummy/new-detail-dashboard'
  );
  let json = await response.json();
  return json;
};

export const KpiDashboardMethod = {
  getKpiData,
  getKpiDataDetail
};
