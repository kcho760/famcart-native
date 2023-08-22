import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import  {logoutUser} from '../store/auth';
import {fetchLists, fetchList} from '../store/list';
import ListDetails from '../components/ListDetails';
import NewListForm from '../components/NewListForm';

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.all) || [];
  const [selectedList, setSelectedList] = useState(null);
  const [showNewListModal, setShowNewListModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const success = await dispatch(logoutUser());
      if (success) {
        navigation.navigate('Splash');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  const handleTabClick = (list) => {
    dispatch(fetchList(list.id));
    setSelectedList(list);
  };

  const handleAddListClick = () => {
    setShowNewListModal(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', height: 50 }}>
        <ScrollView horizontal style={{ flex: 1 }}>
          {lists.map((list) => (
            <TouchableOpacity
              key={list.id}
              style={{
                padding: 10,
                backgroundColor: selectedList && selectedList.id === list.id ? 'green' : 'grey',
                justifyContent: 'center',
              }}
              onPress={() => handleTabClick(list)}
            >
              <Text style={{ fontSize: 18 }}>{list.name}</Text>
            </TouchableOpacity>
          ))}
            <TouchableOpacity
              onPress={handleAddListClick}
              style={{
                width: 50, // Fixed width for the button
                height: '100%',
                backgroundColor: 'pink',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
              <Text style={{ fontSize: 24 }}>+</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        {selectedList && <ListDetails list={selectedList} />}
      </View>
      {showNewListModal && (
        <NewListForm onClose={() => setShowNewListModal(false)} />
      )}
    </View>
  );  
}
  

export default HomeScreen;