import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signUpUser } from '../store/auth';
import { useNavigation } from '@react-navigation/native';

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
        password_confirmation: passwordConfirmation, // Adjust this key based on your backend expectation
      };
      
      const newUser = await dispatch(signUpUser(user));
      if (newUser) {
        navigation.navigate('Home')
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCompleteType="email"
        placeholder="Enter your email"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <Text>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPasswordConfirmation}
        value={passwordConfirmation}
        secureTextEntry={true}
        placeholder="Confirm your password"
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default SignupScreen;
