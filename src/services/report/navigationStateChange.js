/** IMPORT NAVIGATION SERVICE */
import NavigationService from '../../navigation/NavigationService';
import { globalReportFromPage } from './globalReport';
/** GET NAME NAVIGATION */
const navigationStateChange = (prevState, currentState, action) => {
  const currentRouteName = NavigationService.getActiveRouteName(currentState);
  const previousRouteName = NavigationService.getActiveRouteName(prevState);
  if (previousRouteName !== currentRouteName) {
    globalReportFromPage(previousRouteName, currentRouteName);
  }
};

export { NavigationService, navigationStateChange };
