import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ListSettingsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name="cog" size={30} color="rgb(246, 245, 228)" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(25, 13, 43)',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default ListSettingsButton;
