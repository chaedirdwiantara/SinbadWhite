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

// for kpi dashboard
export const changeStartDateFormat = date => {
  date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  date.toISOString();
  return date.format();
};
export const changeEndDateFormat = date => {
  date.set({ hour: 23, minute: 59, second: 59 });
  date.toISOString();
  return date.format();
};
export const getStartDateNow = () => changeStartDateFormat(moment());
/*
 * TODO: DO NOT USE THIS FUNCTION
 */
export const getStartDateMinHour = () => moment().startOf('day').subtract(1, 'hour').format();
export const getDateNow = () => moment().format();
export const getMonthNow = () => moment().month();
export const getYearNow = () => moment().year();
export const getStartDateMonth = () =>
  changeStartDateFormat(moment([getYearNow(), getMonthNow()]));
export const getEndDateMonth = () =>
  changeEndDateFormat(moment(getStartDateMonth()).endOf('month'));

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Ayu
 * createdDate:
 * updatedBy: Dyah
 * updatedDate: 18082020
 * updatedFunction:
 * -> update time helper for kpi dashboard (changeStartDateFormat & changeEndDateFormat).
 *
 */
