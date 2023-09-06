import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../store/auth';
import { LinearGradient } from 'expo-linear-gradient';


function SignupScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const user = {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      };

      const newUser = await dispatch(signUpUser(user));
      if (newUser) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCompleteType="email"
        placeholder="Enter your email"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPasswordConfirmation}
        value={passwordConfirmation}
        secureTextEntry={true}
        placeholder="Confirm your password"
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});

export default SignupScreen;
