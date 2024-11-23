import React, { useEffect } from 'react';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for authenticated users
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide the tab bar
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="trans" component={Transactions} />
      <Tab.Screen name="reports" component={Reports} />
      <Tab.Screen name="settlement_report" component={SettlementReport} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Authenticated Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash_screen" component={SplashScreen} />
      <Stack.Screen name="mpin" component={Mpin} />
      <Stack.Screen name="main" component={BottomTabNavigator} />
      <Stack.Screen name="transactionreceipt" component={TransactionReceipt} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="payment_status" component={PaymentStatus} />
    </Stack.Navigator>
  );
};

// Unauthenticated Stack Navigator
const UnauthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash_screen" component={SplashScreen} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="mpin" component={Mpin} />
    </Stack.Navigator>
  );
};

// Main Routes Component
const Routes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('merchant_status_data');
        if (token !== null) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.log('Failed to load session token', e);
      }
    };

    checkSession();
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthStack /> : <UnauthStack />}
    </NavigationContainer>
  );
};

export default Routes;
