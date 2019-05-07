import { createStackNavigator } from 'react-navigation';
import Welcome from '../screens/session/WelcomeScreen';
import LoginRegister from '../screens/session/LoginRegisterScreen';
import RegisterInfo from '../screens/session/RegisterInfoScreen';
import RememberPassword from '../screens/session/RememberPassword';

const loginNavigator = createStackNavigator({
  Welcome,
  LoginRegister,
  RegisterInfo,
  RememberPassword,
}, {
  initialRouteName: 'Welcome',
  defaultNavigationOptions: {
    header: null,
  },
});

export default loginNavigator;
