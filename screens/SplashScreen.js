import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkForStoredUser(navigation) {
  try {
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && typeof user === 'object') {
        // Navigate to the main screen if user data is present
        navigation.navigate('Home');
      }
    }
  } catch (e) {
    console.error('Failed to fetch user from storage', e);
  }
}

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    checkForStoredUser(navigation);
  }, []);

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>
        Welcome to the Cho Family Shopping App
      </Text>
      <Text style={styles.instructionText}>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 500,
    height: 500,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 40,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    flex: 1,
    margin: 5,
  },
  greenButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  greenButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SplashScreen;
