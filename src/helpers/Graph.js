import ApiHost from '../services/apiHost';

export const generateGraphUri = ({ graphContentType, startDate, endDate, userId, period, }) => {
  return `${ApiHost.url}supplier/salesmankpi/v1/mobile/page/graph?graphContentType=${graphContentType}&userIds=${userId}&period=${period}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
};
