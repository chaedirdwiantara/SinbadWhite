import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import ProfileDataView from '../../screens/profiles/ProfileDataView';
import SegmentasiSalesTeamView from '../../screens/profiles/SegmentasiSalesTeamView';
import ProfileDataNameEdit from '../../screens/profiles/ProfileDataNameEdit';
import ProfileAreaMapping from '../../screens/profiles/ProfileAreaMapping'

const ProfileNavigator = {
  ProfileDataView: {
    screen: ProfileDataView,
    navigationOptions: {
      headerTitle: 'Data Diri',
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
  },
  SegmentasiSalesTeamView: {
    screen: SegmentasiSalesTeamView,
    navigationOptions: {
      headerTitle: 'Segmentasi Sales Team',
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
  },
  ProfileDataNameEdit: {
    screen: ProfileDataNameEdit,
    navigationOptions: {
      headerTitle: 'Ubah Nama',
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
  },
  ProfileAreaMapping: {
    screen: ProfileAreaMapping,
    navigationOptions: {
      headerTitle: 'Area Mapping',
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

export default ProfileNavigator;
