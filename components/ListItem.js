import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {fuelActions} from '../store/fuel-slice';

const ListItem = props => {
  const consumptionObj = props.item;
  const dispatch = useDispatch();
  const removeConsumption = id => {
    dispatch(fuelActions.deleteConsumption(id));
    showAlert();
  };

  const showAlert = () => {
    Alert.alert('Information', 'Consumption was remove successfully!');
  };

  return (
    <Card style={styles.listItem}>
      
        <Pressable
          style={styles.deleteButton}
          onPress={removeConsumption.bind(this, consumptionObj.id)}>
          <Icon style={styles.icon} name="delete" color="grey" />
        </Pressable>
    
      <View>
        <View style={styles.field}>
          <Text style={{...styles.label, ...styles.text}}>Fuel Type:</Text>
          <Text style={styles.text}>{consumptionObj.fuelType}</Text>
        </View>
        <View style={styles.field}>
          <Text style={{...styles.label, ...styles.text}}>Price:</Text>
          <Text style={styles.text}>{consumptionObj.price}</Text>
        </View>
        <View style={styles.field}>
          <Text style={{...styles.label, ...styles.text}}>Fuel Used::</Text>
          <Text style={styles.text}>{consumptionObj.usedAmount}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 5,
    position: 'relative',
  },
  icon: {
    fontSize: 25,
    alignSelf: 'flex-end',
  },
  text: {
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 15,
  },
  label: {
    width: 150,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
  },
});

export default ListItem;
