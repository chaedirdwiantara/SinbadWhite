import React, { Component } from 'react';
import NavigationStack from './navigator';
import NavigationService from './NavigationService';
import { firebase } from '../library/thirdPartyPackage';

class Navigations extends Component {
  render() {
    return (
      <NavigationStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = NavigationService.getActiveRouteName(
            currentState
          );
          const previousRouteName = NavigationService.getActiveRouteName(
            prevState
          );

          if (previousRouteName !== currentRouteName) {
            firebase.crashlytics().log(`change screen to ${currentRouteName}`);
          }
        }}
      />
    );
  }
}

export default Navigations;
