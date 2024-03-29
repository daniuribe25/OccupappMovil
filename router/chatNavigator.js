import { createStackNavigator } from 'react-navigation';
import Chat from '../screens/chat/ChatScreen';
import ChatList from '../screens/chat/ChatListScreen';

const chatNavigator = createStackNavigator({
  Chat,
  ChatList,
}, {
  initialRouteName: 'ChatList',
  defaultNavigationOptions: {
    header: null,
  },
});

export default chatNavigator;
