import ApiHost from '../services/apiHost';

export const generateGraphUri = ({
  graphContentType,
  startDate,
  endDate,
  userId,
  period,
  supplierId
}) => {
  return `${
    ApiHost.url
  }supplier/salesmankpi/v1/mobile/page/graph?graphContentType=${graphContentType}&userIds=${userId}&period=${period}&startDate=${encodeURIComponent(
    startDate
  )}&endDate=${encodeURIComponent(endDate)}&supplierId=${supplierId}`;
  // return `http://192.168.88.173:8080/v1/mobile/page/graph?graphContentType=${graphContentType}&userIds=${userId}&period=${period}&startDate=${encodeURIComponent(
  //   startDate
  // )}&endDate=${encodeURIComponent(endDate)}`;
};
