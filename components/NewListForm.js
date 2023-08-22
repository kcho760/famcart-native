import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createList } from '../store/list'; // Import the createList action

function NewListForm({ onClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id); // Get the user ID from the Redux store
  const [listName, setListName] = useState('');

  const handleSubmit = () => {
    if (listName.trim() !== '') {
      dispatch(createList(listName, userId)); // Pass the userId to the createList action
      onClose();
    }
  };

  return (
    <Modal visible={true} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create a New List</Text>
          <TextInput
            style={styles.input}
            value={listName}
            onChangeText={setListName}
            placeholder="Enter list name"
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
  },
});

export default NewListForm;
