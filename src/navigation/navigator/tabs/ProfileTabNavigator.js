import ProfileView from '../../../screens/profiles/ProfileView';
import masterColor from '../../../config/masterColor.json';
import GlobalFont from '../../../helpers/GlobalFont';

const ProfileTabNavigator = {
  ProfileView: {
    screen: ProfileView,
    navigationOptions: {
      headerTitle: 'Profil',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
};

export default ProfileTabNavigator;
