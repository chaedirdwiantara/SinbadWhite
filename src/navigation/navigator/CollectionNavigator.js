import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import CollectionView from '../../screens/collection/CollectionView';

const CollectionNavigator = {
  CollectionView: {
    screen: CollectionView,
    navigationOptions: {
      headerTitle: 'Collection List',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  }
};

export default CollectionNavigator;
