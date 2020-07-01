import React from 'react';
import { StatusBar } from 'react-native';
import masterColor from '../config/masterColor.json';

const StatusBarRed = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={masterColor.statusBarDefault}
      barStyle={'light-content'}
    />
  );
};

const StatusBarWhite = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={masterColor.statusBarWhite}
      barStyle={'dark-content'}
    />
  );
};

const StatusBarBlack = () => {
  return (
    <StatusBar
      translucent={false}
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
      translucent={false}
      backgroundColor={masterColor.statusBarBlackOP40}
      barStyle={'light-content'}
    />
  );
};

const StatusBarBlackOP40Translucent = () => {
  return (
    <StatusBar
      translucent={true}
      backgroundColor={masterColor.statusBarBlackOP40}
      barStyle={'light-content'}
    />
  );
};

const StatusBarRedOP40 = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={masterColor.statusBarRedOP40}
      barStyle={'light-content'}
    />
  );
};

const StatusBarRedOP50 = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={masterColor.statusBarRedOP50}
      barStyle={'light-content'}
    />
  );
};

const StatusBarTransparent = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent={true}
    />
  );
};

const StatusBarTransparentBlack = () => {
  return (
    <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent={true}
    />
  );
};

export {
  StatusBarWhite,
  StatusBarRed,
  StatusBarBlack,
  StatusBarBlackOP40,
  StatusBarRedOP40,
  StatusBarRedOP50,
  StatusBarTransparent,
  StatusBarTransparentBlack,
  StatusBarBlackOP40Translucent
};
