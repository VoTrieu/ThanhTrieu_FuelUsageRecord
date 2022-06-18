import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import FloatButton from '../components/FloatButton';

const ConsumptionScreen = props => {
  const {navigation} = props;

  const addNewConsumption = () => {
    navigation.navigate('NewConsumptionScreen');
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={rentingList}
        renderItem={value => (
          <ListItem onUpdate={navigateToInputScreen} item={value.item} />
        )}
      /> */}

      <FloatButton
        onPress={addNewConsumption}
        style={styles.button}
        name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 70,
    right: 50,
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    height: '100%',
  },
  listItem: {
    fontSize: 16,
    backgroundColor: 'red',
    color: 'white',
  },
  icon: {
    fontSize: 25,
  },
});

export default ConsumptionScreen;
