import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
"import 'react-native-gesture-handler';"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PrayerScreen from './screens/PrayerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Prayer" component={PrayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}