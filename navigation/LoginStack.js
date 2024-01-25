import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login';
import StartScreen from "../screens/start";
import DetectionScreen from "../screens/detection";


const Stack = createStackNavigator();

const LoginStack = () => {
  return (
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Detection" component={DetectionScreen} />
      </Stack.Navigator>
  );
};

export default LoginStack;