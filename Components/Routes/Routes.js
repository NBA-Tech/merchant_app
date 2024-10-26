// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Transactions from '../Transaction/Transactions'; 

import Card from '../../Core_ui/Card';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="trans"  
      screenOptions={{  gestureEnabled: true,
      gestureDirection: 'horizontal',
      animation: 'slide_from_right',
      headerShown:false}}>
        
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="trans" component={Transactions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
