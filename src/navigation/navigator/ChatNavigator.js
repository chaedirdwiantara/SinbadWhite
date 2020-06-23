import ChatView from '../../screens/chat/ChatView';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';

const ChatNavigator = {
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      headerTitle: 'Chat',
      headerTitleStyle: GlobalFont.textHeaderPage,
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
