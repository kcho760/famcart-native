import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // checkForStoredUser(navigation);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>
        FAMCART
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c669f'
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: -100,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#007BFF', // vibrant blue for the "Log In" button
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  greenButton: {
    backgroundColor: '#28a745', // bright green for the "Sign Up" button
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default SplashScreen;
