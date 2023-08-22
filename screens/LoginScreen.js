import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch if you are using Redux
import { loginUser } from '../store/auth'; // Path to your login action

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log('handleLogin button pressed!');
    setIsLoading(true);

    try {
      const formData = {
        email,
        password,
      };
      console.log(formData);

      const success = await dispatch(loginUser(formData));
      if (success) {
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
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

export default LoginScreen;
