import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import PayMerchantScreen from './screens/PayMerchantScreen';
import OfferScreen from './screens/OfferScreen';
import AccountScreen from './screens/AccountScreen';

const MainNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    PayMerchant: PayMerchantScreen ,
    Offers: OfferScreen,
    Account:AccountScreen 
  },
  {
    initialRouteName: "Home",
    tabBarOptions :{
      showIcon:false,
      style:{
        alignItems:'center'
      }
    }
  });

const App = createAppContainer(MainNavigator);

export default App;
