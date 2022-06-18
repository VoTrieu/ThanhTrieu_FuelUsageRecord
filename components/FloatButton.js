import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatButton = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{...styles.button, ...props.style}}>
      <Icon name={props.name} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    color: 'blue',
  },
});

export default FloatButton;
