import React from 'react';
import IconBadge from 'react-native-icon-badge';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import homeNavigator from './homeNavigator';
import profileNavigator from './profileNavigator';
import chatNavigator from './chatNavigator';
import quoteNavigator from './quoteNavigator';
import { appColors } from '../styles/colors';
import TabBar from './components/TabBar';
import Wallet from '../screens/wallet/WalletScreen';
import TextF from '../components/custom/TextF';

const TabsNavigator = createBottomTabNavigator({
  Home: {
    screen: homeNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="home"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  ServiceList: {
    screen: quoteNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="hammer"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="wallet"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  Chat: {
    screen: chatNavigator,
    navigationOptions: {
      tabBarIcon: (props) => {
        const n = 0;
        return (
          <IconBadge
            MainElement={
              (
                <FontAwesome
                  name="wechat"
                  size={22}
                  color={props.focused ? appColors.primary : appColors.grey}
                />
              )}
            IconBadgeStyle={{ width: 22, height: 22, backgroundColor: appColors.secondary, top: -10, right: -10 }}
            BadgeElement={<TextF style={{ color: 'white' }}>{n}</TextF>}
            Hidden={n === 0}
          />
        );
      },
    },
  },
  Profile: {
    screen: profileNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="user"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
}, {
  tabBarComponent: (props) => {
    const p = { ...props, chatNumber: 5 };
    return <TabBar {...p} />;
  },
  tabBarOptions: { showLabel: false },
});

export default TabsNavigator;
