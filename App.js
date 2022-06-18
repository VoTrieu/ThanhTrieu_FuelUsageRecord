/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './navigations/AppNavigator';
import Data from './models/data';
import {Provider} from 'react-redux';
import store from './store/index';

const App: () => Node = () => {
  useEffect(() => {
    const result = Data.initData();
    result.then(
      () => console.log('data sucessfully inited'),
      error => console.log('data failed inited', error),
    );
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
