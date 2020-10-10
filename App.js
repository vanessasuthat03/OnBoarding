/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Screens
import {OnBoarding} from './app/screens/';

const Stack = createStackNavigator();
const App = ()=> {
  return (
    <NavigationContainer>
    <SafeAreaProvider>
    <Stack.Navigator>
    <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}}/>
    </Stack.Navigator>
    </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
