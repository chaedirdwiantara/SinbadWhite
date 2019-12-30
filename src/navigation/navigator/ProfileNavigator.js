import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import ProfileDataView from '../../screens/profiles/ProfileDataView';
import ProfileDataNameEdit from '../../screens/profiles/ProfileDataNameEdit';

const ProfileNavigator = {
  ProfileDataView: {
    screen: ProfileDataView,
    navigationOptions: {
      headerTitle: 'Data Diri',
      headerTitleStyle: [
        GlobalFont.type5,
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
  },
  ProfileDataNameEdit: {
    screen: ProfileDataNameEdit,
    navigationOptions: {
      headerTitle: 'Ubah Nama',
      headerTitleStyle: [
        GlobalFont.type5,
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

export default ProfileNavigator;
