import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../store/auth';
import { fetchLists, fetchList } from '../store/list';
import ListDetails from '../components/ListDetails';
import NewListForm from '../components/NewListForm';
import ListSettings from '../components/ListSettings';
import ListSettingsButton from '../components/ListSettingsButton';

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.all) || [];
  const currentUser = useSelector((state) => state.auth.user);
  const [selectedList, setSelectedList] = useState(null);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showListSettings, setShowListSettings] = useState(false);

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
      await dispatch(fetchLists());
      setSelectedList(null);
    } catch (error) {
      console.error('An error occurred while refreshing lists:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Debugging Box */}
      <View style={styles.debugBox}>
        <Text>Debugging Box:</Text>
        <Text>ID: {currentUser ? currentUser.id : 'null'}</Text>
        <Text>Name: {currentUser ? currentUser.name : 'null'}</Text>
      </View>
      <View style={styles.outerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ScrollView horizontal style={{ flex: 1 }}>
            {lists.map((list) => (
              <TouchableOpacity
                key={list.id}
                style={{
                  padding: 10,
                  height: 50,
                  backgroundColor: selectedList && selectedList.id === list.id ? 'rgb(71, 84, 204)' : 'rgb(35, 23, 53)',
                  justifyContent: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                }}
                onPress={() => handleTabClick(list)}
              >
                <Text style={{ fontSize: 18, color: 'white' }}>{list.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={handleAddListClick}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'rgb(65, 143, 195)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 24 }}>+</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          {selectedList && (
            <ListSettingsButton onPress={() => setShowListSettings(true)} />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {selectedList && (
            <View style={styles.listDetailsContainer}>
              <ListDetails list={selectedList} />
            </View>
          )}
        </View>

      </View>
      {showNewListModal && (
        <NewListForm onClose={() => setShowNewListModal(false)} />
      )}
      {showListSettings && selectedList && (
        <ListSettings
          list={selectedList}
          onClose={() => setShowListSettings(false)}
          onDelete={handleListDeletion}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgb(23, 22, 7)',
    padding: 10,
  },
  debugBox: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgb(61, 74, 194)',
    borderRadius: 20,
    margin: 10,
    padding: 15,
  },
  tab: {
    padding: 10,
    height: 50,
    backgroundColor: 'rgb(25, 13, 43)',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: 'rgb(65, 143, 195)',
  },
  tabText: {
    fontSize: 20,  // Increased size
    fontWeight: 'bold',  // Bold
    color: 'rgb(246, 245, 228)',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(25, 13, 43)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 26,  // Increased size
    fontWeight: 'bold',  // Bold
    color: 'rgb(246, 245, 228)',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: 'rgb(25, 13, 43)',
    borderRadius: 5,
    margin: 10,
  },
  logoutText: {
    fontSize: 18,  // Increased size
    fontWeight: 'bold',  // Bold
    color: 'rgb(246, 245, 228)',
  },
  listDetailsContainer: {
    flex: 1,  // Added this to make it fill the remaining space
    backgroundColor: '#8194cc',
    margin: 10,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgb(25, 13, 43)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
});


export default HomeScreen;