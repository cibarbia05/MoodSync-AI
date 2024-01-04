import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login';
import MainScreen from "../screens/main";
import StartScreen from "../screens/start";


const Stack = createStackNavigator();

const LoginStack = () => {
  return (
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
  );
};

export default LoginStack;