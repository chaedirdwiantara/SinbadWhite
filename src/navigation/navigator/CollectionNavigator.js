import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import CollectionListView from '../../screens/collection/CollectionListView';

const CollectionNavigator = {
  CollectionListView: {
    screen: CollectionListView,
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
