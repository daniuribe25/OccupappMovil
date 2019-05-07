import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginNavigator from './loginNavigator';
import LoadingAuth from '../screens/session/LoadingAuthScreen';
import TabsNavigator from './tabsNavigator';

const RootNavigator = createAppContainer(createSwitchNavigator(
  {
    LoadingAuth,
    LoginNavigator,
    TabsNavigator,
  },
  {
    initialRouteName: 'LoadingAuth',
  },
));
export default RootNavigator;
