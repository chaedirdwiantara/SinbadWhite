import ChatView from '../../screens/chat/ChatView';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';

const ChatNavigator = {
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      headerTitle: 'Chat',
      headerTitleStyle: GlobalFont.type5,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
};

export default ChatNavigator;
