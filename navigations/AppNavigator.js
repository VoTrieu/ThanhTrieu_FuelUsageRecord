import React from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ConsumptionScreen from '../screens/ConsumptionScreen';
import NewConsumptionScreen from '../screens/NewConsumptionScreen';
import AuthorizationScreen from '../screens/AuthorizationScreen';

const Stack = createNativeStackNavigator();

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'green' : '',
          },
        }}>
        <Stack.Screen
          name="AuthorizationScreen"
          component={AuthorizationScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Fuel Usage Record</Text>
                <Text style={styles.headerTitle}>ThanhTrieu</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ConsumptionScreen"
          component={ConsumptionScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Fuel Usage Record</Text>
                <Text style={styles.headerTitle}>ThanhTrieu</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="NewConsumptionScreen"
          component={NewConsumptionScreen}
          options={{
            title: 'Create Consumption',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loginHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  headerContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
});

export default AppNavigator;
