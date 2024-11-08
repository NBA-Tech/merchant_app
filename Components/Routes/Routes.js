// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Transactions from '../Transaction/Transactions'; 
import Mpin from '../Login/Mpin';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home"  
      screenOptions={{  gestureEnabled: true,
      gestureDirection: 'horizontal',
      animation: 'slide_from_right',
      headerShown:false}}>
        
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="trans" component={Transactions} />
        <Stack.Screen name="mpin" component={Mpin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
