import 'react-native-get-random-values';
import 'fast-text-encoding';
import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {

  const scheme = useColorScheme();
  return (

    <NavigationContainer
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}