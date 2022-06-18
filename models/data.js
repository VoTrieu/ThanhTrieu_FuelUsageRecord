import AsyncStorage from '@react-native-async-storage/async-storage';

class Data {
  constructor() {}

  initData() {
    return AsyncStorage.setItem(
      'initData',
      JSON.stringify({
        fuelStore: [
          {fuelType: 'Petrol', price: '30', unit: 'Liter'},
          {fuelType: 'Diesel', price: '40', unit: 'Liter'},
          {fuelType: 'BatteryCharge', price: '10', unit: 'Unit'},
        ],
        userMaxAllowance: 300,
      }),
    );
  }

  getData() {
    return AsyncStorage.getItem('initData');
  }
}

export default Data;
