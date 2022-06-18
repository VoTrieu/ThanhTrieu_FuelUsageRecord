import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import Dropdown from '../components/DropDown';
import {useSelector, useDispatch} from 'react-redux';
import {fuelActions} from '../store/fuel-slice';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NewConsumptionScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const fuelStore = useSelector(state => state.fuel.fuelStore);
  const currentUserAllowance = useSelector(state => state.fuel.userAllowance);
  const [selectedFuelType, setSelectedFuelType] = useState({});
  const [quantity, setQuantity] = useState({});

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
    await auth().signOut();
    await AsyncStorage.removeItem('token');
    navigation.navigate('AuthorizationScreen');
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

  const onCreateConsumption = () => {
    if (!selectedFuelType || !quantity) {
      Alert.alert('Warning!', 'Please select fuel type and input quantity');
      return;
    }
    const usedAmount = quantity * selectedFuelType.price;
    if (usedAmount > currentUserAllowance) {
      Alert.alert(
        'Warning!',
        `You are charged ${usedAmount} but your current allowance is ${currentUserAllowance}`,
      );
      return;
    }

    const newConsumption = {
      id: new Date().toISOString(),
      usedAmount: usedAmount,
      ...selectedFuelType,
    };

    dispatch(fuelActions.addConsumption(newConsumption));
    Alert.alert('Info!', 'Consumption successfully created!');
  };

  const onSelectFuelType = fuelType => {
    setSelectedFuelType(fuelType);
  };

  const updateQuantity = _quantity => {
    setQuantity(_quantity);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        list={fuelStore}
        displayField="fuelType"
        initalText="Fuel types"
        onSelect={onSelectFuelType}
      />
      <TextInput
        style={styles.input}
        value={quantity.value}
        onChangeText={updateQuantity}
        keyboardType="numeric"
        placeholder="Enter litres / charge unit"
      />
      <View style={styles.footerContainer}>
        <Pressable style={styles.button} onPress={onCreateConsumption}>
          <Text style={styles.lable}>Create</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  footerContainer: {
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#28a745',
    width: 100,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  lable: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    fontSize: 25,
  },
});

export default NewConsumptionScreen;
