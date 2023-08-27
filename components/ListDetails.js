import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateListItemCheckedStatus, addListItem } from '../store/list';
import AddItem from './AddItem';  // Import the AddItem component

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ListDetails() {
  const currentList = useSelector(state => state.lists.currentList);
  const dispatch = useDispatch();
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const handleCheckboxChange = (listId, itemId, checked) => {
    dispatch(updateListItemCheckedStatus(listId, itemId, checked));
  };

  const handleNewItemSubmit = (newItem) => {
    dispatch(addListItem(currentList.id, newItem));
  };

  const handleAddListItem = () => {
    setShowAddItemModal(true);
  };

  if (!currentList) {
    return null;
  }

  return (
    <View style={{ padding: 10 }}>
      {/* AddItem Modal */}
      <Modal
        visible={showAddItemModal}
        transparent={true}
        onRequestClose={() => setShowAddItemModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAddItemModal(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalBox}>
              <AddItem
                onClose={() => setShowAddItemModal(false)}
                onSubmit={handleNewItemSubmit}
                listId={currentList.id}
              />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>{currentList.name}</Text>
        <TouchableOpacity onPress={handleAddListItem} style={{ padding: 8, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#f0f0f0' }}>
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
        renderItem={({ item: listItem }) => {
          const correspondingItem = currentList.items.find(item => item.id === listItem.item_id);

          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3, minWidth: 100 }}>
                <Checkbox
                  status={listItem.checked ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxChange(currentList.id, listItem.id, !listItem.checked)}
                />
                <Text>{correspondingItem?.item.name}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 50, alignItems: 'center' }}>
                <Text>{listItem.quantity}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 50, alignItems: 'center' }}>
                <Text>{correspondingItem?.item.unit}</Text>
              </View>
              <View style={{ flex: 2, minWidth: 100, alignItems: 'center' }}>
                <Text>{formatDate(listItem.created_at)}</Text>
              </View>
              <View style={{ flex: 2, minWidth: 100, alignItems: 'center' }}>
                <Text>{correspondingItem?.item.added_by_name}</Text>
              </View>
            </View>
          );
        }}
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
});

export default ListDetails;
