import { createStackNavigator } from 'react-navigation';
import Profile from '../screens/profile/ProfileScreen';
import EditProfile from '../screens/profile/EditProfileScreen';
import ChangePassword from '../screens/profile/ChangePasswordScreen';
import NewUserService from '../screens/services/NewUserServiceScreen';

const profileNavigator = createStackNavigator({
  Profile,
  EditProfile,
  ChangePassword,
  NewUserService,
}, {
  initialRouteName: 'Profile',
  defaultNavigationOptions: {
    header: null,
  },
});

export default profileNavigator;
