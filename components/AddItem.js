import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddItem({ onClose, onSubmit, listId }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch current user from AsyncStorage
    const fetchCurrentUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  const handleAddItem = () => {
    const newItem = {
      item_name: itemName,
      quantity,
      unit,
      user_id: currentUser ? currentUser.id : null,  // Add user info here
    };

    onSubmit(listId, newItem);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setItemName}
        value={itemName}
        placeholder="Enter item name"
      />

      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setQuantity}
        value={quantity}
        keyboardType="numeric"
        placeholder="Enter quantity"
      />

      <Text style={styles.label}>Unit:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUnit}
        value={unit}
        placeholder="Enter unit"
      />

      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default AddItem;
