import React from 'react';
import { StatusBar } from 'react-native';
import masterColor from '../config/masterColor.json';

const StatusBarRed = () => {
  return (
    <StatusBar
      backgroundColor={masterColor.statusBarDefault}
      barStyle={'light-content'}
    />
  );
};

const StatusBarWhite = () => {
  return (
    <StatusBar
      backgroundColor={masterColor.statusBarWhite}
      barStyle={'dark-content'}
    />
  );
};

const StatusBarBlack = () => {
  return (
    <StatusBar
      backgroundColor={masterColor.statusBarBlack}
      barStyle={'light-content'}
    />
  );
};
/**
 * status bar for modal
 */
const StatusBarBlackOP40 = () => {
  return (
    <StatusBar
      backgroundColor={masterColor.statusBarBlackOP40}
      barStyle={'light-content'}
    />
  );
};

export { StatusBarWhite, StatusBarRed, StatusBarBlack, StatusBarBlackOP40 };
