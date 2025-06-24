import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import HomeScreen from './screens/HomeScreen';
import PrayerScreen from './screens/PrayerScreen';
// import PrayerFeedScreen from './screens/PrayerFeedScreen';

import AboutUsScreen from './screens/AboutUsScreen';
import BroadcastsScreen from './screens/BroadcastsScreen';
import ContactScreen from './screens/ContactScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import OneMinuteMessagesScreen from './screens/OneMinuteMessagesScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  if (!authChecked) return null; // or a loading spinner

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: { backgroundColor: '#1C628F' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hour of Power' }} />
             <Stack.Screen name="Broadcasts" component={BroadcastsScreen} options={{ title: 'Past Broadcasts' }} />
            <Stack.Screen name="Prayer" component={PrayerScreen} options={{ title: 'Prayer Request' }} />
            <Stack.Screen name="About" component={AboutUsScreen} options={{ title: 'About Us' }} />
           
            <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            {/* <Stack.Screen name="PrayerFeed" component={PrayerFeedScreen} options={{ title: 'Prayer Feed' }} /> */}
            <Stack.Screen name="Messages" component={OneMinuteMessagesScreen} options={{ title: 'One Minute Messages' }} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Weekly Schedule' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
