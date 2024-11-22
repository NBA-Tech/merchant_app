import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Transactions from '../Transaction/Transactions';
import Mpin from '../Login/Mpin';
import Reports from '../Reports/Reports';
import Profile from '../Profile/Profile';
import SettlementReport from '../Settlement/SettlementReport';
import TransactionReceipt from '../Transaction/TransactionReceipt';
import { AuthProvider, useAuth } from '../../AuthProvider';
import Payment from '../Payment/Payment';
import PaymentGateway from '../Payment/PaymentGateway';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator with hidden tab bar
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

// Stack Navigator containing Login, Mpin, and Bottom Tabs
const Routes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      console.log("comes");
      try {
        const token = await AsyncStorage.getItem('merchant_status_data');
        console.log(token, isAuthenticated);
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
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="mpin" component={Mpin} />
          <Stack.Screen name="main" component={BottomTabNavigator} />
          <Stack.Screen name="transactionreceipt" component={TransactionReceipt} />
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="payment_gateway" component={PaymentGateway} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="mpin" component={Mpin} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};



export default Routes;
