import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../store/auth';
import { fetchLists, fetchList } from '../store/list';
import ListDetails from '../components/ListDetails';
import NewListForm from '../components/NewListForm';
import ListSettings from '../components/ListSettings';
import ListSettingsButton from '../components/ListSettingsButton'; // Import the ListSettingsButton component

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.all) || [];
  const [selectedList, setSelectedList] = useState(null);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showListSettings, setShowListSettings] = useState(false); // State for showing ListSettings

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

  const handleListDeletion = async () => {
    try {
      // Refresh lists after deletion
      await dispatch(fetchLists());
  
      // Reset the selectedList state to null
      setSelectedList(null);
  
    } catch (error) {
      console.error('An error occurred while refreshing lists:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ScrollView horizontal style={{ flex: 1 }}>
          {lists.map((list) => (
            <TouchableOpacity
              key={list.id}
              style={{
                padding: 10,
                height: 50, // Adjust the height as needed
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
              height: 50, // Adjust the height as needed
              backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 24 }}>+</Text>
          </TouchableOpacity>
        </ScrollView>
  
        {/* Show Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
  
        {/* Show List Settings Button */}
        {selectedList && (
          <ListSettingsButton onPress={() => setShowListSettings(true)} />
        )}
      </View>
  
      <View style={{ flex: 1 }}>
        {selectedList && <ListDetails list={selectedList} />}
      </View>
      {showNewListModal && (
        <NewListForm onClose={() => setShowNewListModal(false)} />
      )}
  
      {/* Render ListSettings when showListSettings is true */}
      {showListSettings && selectedList && (
        <ListSettings 
          list={selectedList} 
          onClose={() => setShowListSettings(false)} 
          onDelete={handleListDeletion}  // Pass the function as a prop
        />
      )}
    </View>
  );
}  
  

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
    backgroundColor: 'purple',
    borderRadius: 5,
    margin: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
