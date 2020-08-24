import {
  React,
  StatusBar
} from '../library/reactPackage'
import { Color } from '../config'

const StatusBarRed = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={Color.statusBarDefault}
      barStyle={'light-content'}
    />
  );
};

const StatusBarWhite = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={Color.statusBarWhite}
      barStyle={'dark-content'}
    />
  );
};

const StatusBarBlack = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={Color.statusBarBlack}
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
      backgroundColor={Color.statusBarBlackOP40}
      barStyle={'light-content'}
    />
  );
};

const StatusBarBlackOP40Translucent = () => {
  return (
    <StatusBar
      translucent={true}
      backgroundColor={Color.statusBarBlackOP40}
      barStyle={'light-content'}
    />
  );
};

const StatusBarRedOP40 = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={Color.statusBarRedOP40}
      barStyle={'light-content'}
    />
  );
};

const StatusBarRedOP50 = () => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={Color.statusBarRedOP50}
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

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 08072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

