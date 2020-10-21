/**
 * =================================
 * NAVIGATION SERVICE
 * =================================
 */
import { NavigationActions } from 'react-navigation';

let navigator;

/** === GET ACTIVE ROUTE NAME === */
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive to nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
/** === TOP LEVEL NAVIGATOR === */
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}
/** === GO TO PAGE SCREEN === */
function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}
/** === BACK TO BEFORE PAGE === */
function goBack(key) {
  navigator.dispatch(
    NavigationActions.back({
      key: key
    })
  );
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  getActiveRouteName
};
