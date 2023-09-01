import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

function SplashScreen() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   // Check if user credentials are stored
  //   const checkStoredCredentials = async () => {
  //     try {
  //       const userData = await AsyncStorage.getItem('user');
  //       if (userData) {
  //         // User credentials are stored, log in the user
  //         const parsedUserData = JSON.parse(userData);
  //         // Dispatch your login action here to set user data in Redux store
  //         // Example: dispatch(setUser(parsedUserData));
  //         // After dispatching the login action, navigate to the Home screen
  //         navigation.navigate('Home');
  //       }
  //     } catch (error) {
  //       console.error('Error checking stored credentials:', error);
  //     }
  //   };

  //   checkStoredCredentials();
  // }, []); // Run this effect only once on component mount

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Welcome to the Cho Family Shopping App
      </Text>
      <Text>
        Olesya...Click the big green button!!!
      </Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Log In"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.greenButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    flex: 1,
    margin: 5,
    fontSize: 18, // Adjust font size as needed
  },
  greenButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Adjust padding as needed
  },
  greenButtonText: {
    color: 'white', // Text color
    fontSize: 18, // Adjust font size as needed
  },
});

export default SplashScreen;
