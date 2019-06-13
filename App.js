import { createAppContainer, createBottomTabNavigator, createSwitchNavigator, createStackNavigator,HeaderBackButton } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import PayMerchantScreen from './screens/PayMerchantScreen';
import OfferScreen from './screens/OfferScreen';
import AccountScreen from './screens/AccountScreen';
import RechargeScreen from './screens/RechargeScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Recharge: {
    screen: RechargeScreen
  }
})
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    PayMerchant: PayMerchantScreen,
    Offers: OfferScreen,
    Account: AccountScreen
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showIcon: false,
      style: {
        alignItems: 'center'
      }
    }
  });


const App = createAppContainer(TabNavigator);

export default App;
