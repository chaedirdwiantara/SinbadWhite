import ApiRest from '../apiRest';

function getKpiData({ startDate, endDate, period, userId, supplierId }) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/all?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userId=${userId}&supplierId=${supplierId}`,
    method: 'GET'
  });
}

function getKpiSalesPending({
  startDate,
  endDate,
  period,
  userId,
  supplierId
}) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/achieved/totalsalespending?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userId=${userId}&supplierId=${supplierId}`,
    method: 'GET'
  });
}

async function getKpiDataDetail({
  startDate,
  endDate,
  period,
  userId,
  supplierId
}) {
  const response = await ApiRest({
    path: `supplier/salesmankpi/v1/mobile/all?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userId=${userId}&supplierId=${supplierId}`,
    method: 'GET'
  });
  return response;
}

/*
 * API FOR GRAPHIC DATA DASHBOARD
 */

function getKpiDataGraphTotalSales({ startDate, endDate, period, userId }) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/totalsalesgraph?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userIds=${userId}`,
    method: 'GET'
  });
}

function getKpiDataGraphCountOrder({ startDate, endDate, period, userId }) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/countordergraph?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userIds=${userId}`,
    method: 'GET'
  });
}

function getKpiDataGraphCountStore({ startDate, endDate, period, userId }) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/countstoregraph?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userIds=${userId}`,
    method: 'GET'
  });
}

function getKpiDataGraphCountStoreOrder({
  startDate,
  endDate,
  period,
  userId
}) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/countstoreordergraph?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userIds=${userId}`,
    method: 'GET'
  });
}

function getKpiDataGraphCountVisitedStore({
  startDate,
  endDate,
  period,
  userId
}) {
  return ApiRest({
    path: `supplier/salesmankpi/v1/mobile/countvisitedstoregraph?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(
      endDate
    )}&period=${period}&userIds=${userId}`,
    method: 'GET'
  });
}

export const SalesmanKpiMethod = {
  getKpiData,
  getKpiSalesPending,
  getKpiDataDetail,
  getKpiDataGraphTotalSales,
  getKpiDataGraphCountOrder,
  getKpiDataGraphCountStore,
  getKpiDataGraphCountStoreOrder,
  getKpiDataGraphCountVisitedStore
};
