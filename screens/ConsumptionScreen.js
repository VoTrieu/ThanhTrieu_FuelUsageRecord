import React, {useLayoutEffect, useEffect} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';

import FloatButton from '../components/FloatButton';
import ListItem from '../components/ListItem';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConsumptionScreen = props => {
  const {navigation} = props;

  //Check if user logged in
  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        navigation.navigate('AuthorizationScreen');
      }
    }
    fetchToken();
  }, []);

  const logout = async () => {
    auth()
      .signOut()
      .then(
        () => console.log('Logout Successfully'),
        error => console.log('Logout failed', error),
      )
      .finally(() => {
        AsyncStorage.removeItem('token');
        navigation.navigate('AuthorizationScreen');
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.iconContainer} onPress={logout}>
          <Icon style={styles.icon} name="logout" color="#fff" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const userConsumptionList = useSelector(
    state => state.fuel.userConsumptionList,
  );
  const currentUserAllowance = useSelector(state => state.fuel.userAllowance);
  const addNewConsumption = () => {
    navigation.navigate('NewConsumptionScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.allowanceContainer}>
        <Text style={styles.text}>
          User Allowance Remaining: {currentUserAllowance}
        </Text>
      </View>
      <FlatList
        data={userConsumptionList}
        renderItem={value => <ListItem item={value.item} />}
      />

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
  allowanceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 30,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConsumptionScreen;
