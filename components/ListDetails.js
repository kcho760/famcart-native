import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateListItemCheckedStatus } from '../store/list';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ListDetails() {
  const currentList = useSelector(state => state.lists.currentList);
  const dispatch = useDispatch();

  const handleCheckboxChange = (listId, itemId, checked) => {
    dispatch(updateListItemCheckedStatus(listId, itemId, checked));
  };

  const handleAddListItem = () => {
    // Your logic to add a new list item
  };

  if (!currentList) {
    return null;
  }

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>{currentList.name}</Text>
        <TouchableOpacity onPress={handleAddListItem} style={{ padding: 8, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Add Item</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={currentList.list_items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: listItem }) => {
          const correspondingItem = currentList.items.find(item => item.id === listItem.item_id);

          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
              <Checkbox
                status={listItem.checked ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange(currentList.id, listItem.id, !listItem.checked)}
              />
              <Text style={{ flex: 1 }}>{correspondingItem?.item.name}</Text>
              <Text>{listItem.quantity}</Text>
              <Text>{correspondingItem?.item.unit}</Text>
              <Text>{formatDate(listItem.created_at)}</Text>
              <Text>{correspondingItem?.item.added_by_name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default ListDetails;
