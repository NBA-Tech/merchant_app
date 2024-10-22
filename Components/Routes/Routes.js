// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/Login';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login"  
      screenOptions={{  gestureEnabled: true,
      gestureDirection: 'horizontal',
      animation: 'slide_from_right',
      headerShown:false}}>
        
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
