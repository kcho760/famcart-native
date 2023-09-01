import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteList } from '../store/list';

function ListSettingsModal({ visible, onClose, list, onDelete }) { // <-- Pass the listId as a prop
  const dispatch = useDispatch();  // <-- Initialize useDispatch

  const handleDelete = async () => {
    try {
      await dispatch(deleteList(list.id));  // <-- Dispatch the deleteList action
      onDelete();  // <-- Call the onDelete function passed as prop
      onClose();  // <-- Close the modal
    } catch (error) {
      console.error('An error occurred during list deletion:', error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            {/* Content for List Settings */}
            <Text>List Settings</Text>

            {/* Delete List button */}
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete List</Text>
            </TouchableOpacity>

            {/* Close button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'red',
  },
  deleteButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default ListSettingsModal;
