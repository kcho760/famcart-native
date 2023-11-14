import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateListItemCheckedStatus, fetchList } from '../store/list';
import AddItem from './AddItem';
import { deleteItems } from '../store/item';
import Icon from 'react-native-vector-icons/FontAwesome';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ListDetails() {
  const currentList = useSelector(state => state.lists.currentList);
  const dispatch = useDispatch();
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  const handleCheckboxChange = (listId, itemId, checked) => {
    dispatch(updateListItemCheckedStatus(listId, itemId, checked))
      .then(() => dispatch(fetchList(currentList.id)));
  };

  const handleAddListItem = () => {
    setShowAddItemModal(true);
  };

  const fetchAndCloseModal = () => {
    dispatch(fetchList(currentList.id))
      .then(() => setShowAddItemModal(false));
  };

  const toggleDeleteMode = () => {
    if (deleteMode) {
      handleDone();
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
    dispatch(deleteItems(itemsToDelete))
      .then(() => dispatch(fetchList(currentList.id)));
    setItemsToDelete([]);
    setDeleteMode(false);
  };

  useEffect(() => {
    // Fetch data here
  }, []);

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
            <TouchableWithoutFeedback>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 90 }}> 
            {deleteMode ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Icon name="trash" size={20} color="white" />
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Text style={{ color: 'white' }}>Delete Items</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#333' }}>
  {deleteMode && (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', color: 'white' }}>Delete</Text>
    </View>
  )}
  <View style={{ flex: 2, alignItems: 'center' }}>
    <Text style={{ fontWeight: 'bold', color: 'white' }}>Item</Text>
  </View>
  <View style={{ flex: 2, alignItems: 'center' }}>
    <Text style={{ fontWeight: 'bold', color: 'white' }}>#</Text>
  </View>
  <View style={{ flex: 2, alignItems: 'center' }}>
    <Text style={{ fontWeight: 'bold', color: 'white' }}>Date</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3, minWidth: 80 }}>
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

            <View style={{ flex: 1, minWidth: 50, alignItems: 'left' }}>
              <Text>{listItem.quantity}</Text>
            </View>


            <View style={{ flex: 1, minWidth: 50, alignItems: 'left' }}>
              <Text>{formatDate(listItem.created_at)}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  deleteButton: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'rgb(65, 143, 195)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  addItemButton: {
    padding: 10,
    backgroundColor: 'rgb(71, 84, 204)',
    borderRadius: 5,
    borderWidth: 1,
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
