import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Transactions from '../Transaction/Transactions';
import Mpin from '../Login/Mpin';
import Reports from '../Reports/Reports';
import Profile from '../Profile/Profile';
import SettlementReport from '../Settlement/SettlementReport';
import TransactionReceipt from '../Transaction/TransactionReceipt';
import Payment from '../Payment/Payment';
import PaymentGateway from '../Payment/PaymentGateway';
import SplashScreen from '../Home/SplashScreen';
import PaymentStatus from '../Payment/PaymentStatus';
import { AuthProvider, useAuth } from '../../AuthProvider';
import { BackHandlerProvider } from '../../BackHandler';
import { AutoLogoutProvider } from '../../AutoLogoutContext';
import ResetMpin from '../Login/ResetMpin';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ReportsStack = ({ route }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="reports" 
        component={Reports} 
        initialParams={route?.params} // Pass initial params if provided
      />
      <Stack.Screen name="transactionreceipt" component={TransactionReceipt} />
    </Stack.Navigator>
  );
};

// Home Stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="trans" component={Transactions} />
      <Stack.Screen name="reports" component={ReportsStack} />
    </Stack.Navigator>
  );
};

const ProfileTabView=()=>{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profileStack" component={Profile} />

      <Stack.Screen name="resetMpin" component={ResetMpin} />
      </Stack.Navigator>

  )
}

// Bottom Tab Navigator for authenticated users
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide tab bar
      }}
    >
      <Tab.Screen name="homeTab" component={HomeStack} />
      <Tab.Screen name="reportsTab" component={ReportsStack} />
      <Tab.Screen name="settlementTab" component={SettlementReport} />
      <Tab.Screen name="profileTab" component={ProfileTabView} />
      <Tab.Screen name="paymentTab" component={Payment} />
      <Tab.Screen name="payment_status" component={PaymentStatus} />
    </Tab.Navigator>
  );
};


// Authenticated Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash_screen" component={SplashScreen} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="mpin" component={Mpin} />
      <Stack.Screen name="main" component={BottomTabNavigator} />

    </Stack.Navigator>
  );
};

// Unauthenticated Stack Navigator
const UnauthStack = () => {
  return (
    <BackHandlerProvider routes={['home', 'transactionreceipt']}>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash_screen" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="mpin" component={Mpin} />
        <Stack.Screen name="main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </BackHandlerProvider>

  );
};

// Main Routes Component
const Routes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [currentRoute, setCurrentRoute] = useState()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('merchant_status_data');
        const user_creds = await AsyncStorage.getItem('user_creds');
        const mpin_set=await AsyncStorage.removeItem('is_mpin_set');
        if (token !== null && user_creds!=null && mpin_set!=null) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.log('Failed to load session token', e);
      }
    };
    console.log("Session check")

    checkSession();
  }, [isAuthenticated]);

  const onStateChange = (state) => {
    if (state) {
      let route = state.routes[state.index];
      while (route.state && route.state.index !== undefined) {
          route = route.state.routes[route.state.index];
      }

      setCurrentRoute(route.name)
    }
  };

  return (
    <NavigationContainer onStateChange={onStateChange}>
      <BackHandlerProvider currentRoute={currentRoute}>
        <AutoLogoutProvider>

        {isAuthenticated ? <AuthStack /> : <UnauthStack />}
        </AutoLogoutProvider>
      </BackHandlerProvider>
    </NavigationContainer >
  );
};

export default Routes;
