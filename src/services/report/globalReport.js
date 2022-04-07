/** IMPORT FUNCTION FROM NEW RELIC AND MOENGAGE */
import { toMoengageFromPage } from './moengage/toMoengageFromPage';
import { toMoengageFromAction } from './moengage/toMoengageFromAction';
/** THIS FUNCTION FOR SEND DATA BASED ON PAGE */
export const globalReportFromPage = (prevPage, currentPage) => {
  toMoengageFromPage(prevPage, currentPage);
};
/** THIS FUNCTION FOR SEND DATA BASED ON ACTION */
export const globalReportFromAction = (eventName, data) => {
  toMoengageFromAction(eventName, data);
};
