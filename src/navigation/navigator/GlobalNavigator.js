import React from 'react';
import { View } from 'react-native';
import TakeProfilePicture from '../../screens/global/TakeProfilePicture';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';

const LogNavigator = {
  TakeProfilePicture: {
    screen: TakeProfilePicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  }
};

export default LogNavigator;
