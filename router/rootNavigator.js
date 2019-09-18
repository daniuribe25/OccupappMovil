import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginNavigator from './loginNavigator';
import LoadingAuth from '../screens/session/LoadingAuthScreen';
import MainNavigator from './tabsNavigator';

const RootNavigator = createAppContainer(createSwitchNavigator(
  {
    LoadingAuth,
    LoginNavigator,
    TabsNavigator: MainNavigator,
  },
  {
    initialRouteName: 'LoadingAuth',
  },
));
export default RootNavigator;
