import React, { Component } from 'react';
import NavigationStack from './navigator';
import NavigationService from './NavigationService';

class Navigations extends Component {
  render() {
    return (
      <NavigationStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default Navigations;
