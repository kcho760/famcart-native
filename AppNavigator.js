import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen'; // Adjust path as needed
import HomeScreen from './screens/HomeScreen'; // Adjust path as needed
import LoginScreen from './screens/LoginScreen'; // Adjust path as needed
import SignupScreen from './screens/SignupScreen'; // Adjust path as needed

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // This will hide the header for all screens
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
