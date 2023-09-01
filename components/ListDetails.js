import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateListItemCheckedStatus, fetchList } from '../store/list';
import AddItem from './AddItem';
import { deleteItems } from '../store/item';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ListDetails() {
  const currentList = useSelector(state => state.lists.currentList);
  console.log('currentList', currentList);
  
  const dispatch = useDispatch();
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  const handleCheckboxChange = (listId, itemId, checked) => {
    dispatch(updateListItemCheckedStatus(listId, itemId, checked))
      .then(() => dispatch(fetchList(currentList.id)));  // Fetch the updated list from the server
  };
  

  const handleAddListItem = () => {
    setShowAddItemModal(true);
  };

  const fetchAndCloseModal = () => {
    dispatch(fetchList(currentList.id))  // Fetch the updated list from the server
    .then(() => setShowAddItemModal(false));  // Close the modal only after fetching is successful
  };

  const toggleDeleteMode = () => {
    if (deleteMode) {
      handleDone();  // Call the handleDone function to delete the items if already in deleteMode
    }
    setDeleteMode(!deleteMode);
    setItemsToDelete([]);
  };
  

  const handleDeleteItem = (itemId) => {
    if (itemsToDelete.includes(itemId)) {
      setItemsToDelete(itemsToDelete.filter((id) => id !== itemId));
    } else {
      setItemsToDelete([...itemsToDelete, itemId]);
    }
  };

  const handleDone = () => {
    console.log('Handle Done Triggered');
    dispatch(deleteItems(itemsToDelete))
      .then(() => dispatch(fetchList(currentList.id))); // Refetch the list data
    setItemsToDelete([]);
    setDeleteMode(false);
  };

  useEffect(() => {
    // Fetch data here
  }, []); // Empty dependency array means this effect runs only once after the initial render
  
  
  

  if (!currentList) {
    return null;
  }

  return (
    <View style={{ padding: 10 }}>
      <Modal
        visible={showAddItemModal}
        transparent={true}
        onRequestClose={() => fetchAndCloseModal()}
      >
        <TouchableWithoutFeedback onPress={() => setShowAddItemModal(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalBox}>
                <AddItem
                  onClose={() => fetchAndCloseModal()}
                  listId={currentList.id}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
        <TouchableOpacity onPress={handleAddListItem} style={styles.addItemButton}>
          <Text style={{ color: 'white' }}>Add Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteMode ? handleDone : toggleDeleteMode} style={styles.deleteButton}>
          <Text style={{ color: 'white' }}>{deleteMode ? 'Done' : 'Delete Items'}</Text>
        </TouchableOpacity>


      </View>

      <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#f0f0f0' }}>
        {/* Column Headers */}
        {deleteMode && (
          <View style={{ flex: 1, minWidth: 40, minHeight: 40, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Delete</Text>
          </View>
        )}
        <View style={{ flex: 3, minWidth: 100, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Item</Text>
        </View>
        <View style={{ flex: 1, minWidth: 50, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
        </View>
        <View style={{ flex: 1, minWidth: 50, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Unit</Text>
        </View>
        <View style={{ flex: 2, minWidth: 100, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Date</Text>
        </View>
        <View style={{ flex: 2, minWidth: 100, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Added By</Text>
        </View>
      </View>

      <FlatList
        data={currentList.list_items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: listItem }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            {deleteMode && (
              <View style={{ flex: 1, minWidth: 40, maxHeight: 40, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleDeleteItem(listItem.id)} style={styles.deleteListCheckmark}>
                  <Text style={styles.deleteListCheckmarkText}>{itemsToDelete.includes(listItem.id) ? '✓' : ''}</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* List Item Components */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3, minWidth: 100 }}>
              <Checkbox
                status={listItem.checked ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange(currentList.id, listItem.id, !listItem.checked)}
              />
              {listItem.item && listItem.item.name ? (
                <Text>{listItem.item.name}</Text>
              ) : (
                <Text>Loading</Text>
              )}
            </View>

            <View style={{ flex: 1, minWidth: 50, alignItems: 'center' }}>
              <Text>{listItem.quantity}</Text>
            </View>
            <View style={{ flex: 1, minWidth: 50, alignItems: 'center' }}>
              {listItem.item && listItem.item.unit ? (
                <Text>{listItem.item.unit}</Text>
              ) : (
                <Text>Loading</Text>
              )}
            </View>

            <View style={{ flex: 2, minWidth: 100, alignItems: 'center' }}>
              <Text>{formatDate(listItem.created_at)}</Text>
            </View>
            <View style={{ flex: 2, minWidth: 100, alignItems: 'center' }}>
              {listItem.item && listItem.item.added_by_name ? (
                <Text>{listItem.item.added_by_name}</Text>
              ) : (
                <Text>Loading</Text>
              )}
            </View>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // grey background
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',  // white box
    borderRadius: 10,
  },
  deleteButton: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'red', // Set background color to red
    borderRadius: 5, // Rounded corners, but not a circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',  // Set text color to white
    fontSize: 16,    // Adjust font size as needed
    lineHeight: 16,  // Setting the lineHeight the same as fontSize often centers the text
  },
  
  addItemButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  deleteListCheckmark: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },

  deleteListCheckmarkText: {
    fontSize: 24,
    lineHeight: 24,
  },
});

export default ListDetails;
