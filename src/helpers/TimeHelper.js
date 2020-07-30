import moment from 'moment';

const idLocale = require('moment/locale/id');

moment.locale('id', idLocale);

export const toLocalTime = (utcTime, format = '') =>
  moment
    .utc(utcTime)
    .local()
    .format(format);

export const localTimeNow = (units = '') => moment().format(units);

export const timeDiff = (startTime, endTime, units = 'seconds') =>
  (startTime.getTime() - endTime.getTime()) / unitDivision(units);

const unitDivision = units => {
  switch (units) {
    case 'seconds':
      return 1000;
    case 'minute':
      return 60000;
    case 'hour':
      return 36000;
    default:
      return 1;
  }
};
