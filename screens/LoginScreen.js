import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/auth';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (customEmail, customPassword) => {
    setIsLoading(true);
  
    const emailToUse = customEmail || email;
    const passwordToUse = customPassword || password;
  
    try {
      const formData = {
        email: emailToUse,
        password: passwordToUse,
      };
  
      const success = await dispatch(loginUser(formData));
      if (success) {
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = () => {
    handleLogin("test1@example.com", "password123");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
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
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={styles.buttonMargin}>
              <Button title="Login" onPress={() => handleLogin(null, null)} />
            </View>
            <View style={styles.buttonMargin}>
              <Button title="Demo Login" onPress={handleDemoLogin} />
            </View>
          </>
        )}
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
  contentContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginTop: 10
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5
  },
  buttonMargin: {
    marginTop: 10,
  }
});

export default LoginScreen;
