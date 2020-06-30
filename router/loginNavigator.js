import { createStackNavigator } from 'react-navigation';
import Welcome from '../screens/session/WelcomeScreen';
import RegisterUserRole from '../screens/session/RegisterUserRole';
import LoginRegister from '../screens/session/LoginRegisterScreen';
import RegisterInfo from '../screens/session/RegisterInfoScreen';
import RememberPassword from '../screens/session/RememberPasswordScreen';

const loginNavigator = createStackNavigator({
  Welcome,
  LoginRegister,
  RegisterInfo,
  RegisterUserRole,
  RememberPassword,
}, {
  initialRouteName: 'Welcome',
  defaultNavigationOptions: {
    header: null,
  },
});

export default loginNavigator;
