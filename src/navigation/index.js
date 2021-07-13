import React, { Component } from 'react';
import NavigationStack from './navigator';
import NavigationService from './NavigationService';
import {
  nrInteraction,
  nrRecordMetric
} from '../services/report/newRelic/NewRelicRN.js';

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
            nrInteraction(currentRouteName);
            nrRecordMetric('mobileWhiteNavigation', {
              navigateFrom: previousRouteName,
              navigateTo: currentRouteName
            });
          }
        }}
      />
    );
  }
}

export default Navigations;
