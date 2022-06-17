import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {auth} from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthorizationScreen = props => {
  const {navigation} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      if (token != '') {
        navigation.navigate('ConsumptionScreen');
      }
    }
    fetchToken();
  }, []);

  const setToken = firebaseUser => {
    firebaseUser.user
      .getIdToken()
      .then(async token => {
        await AsyncStorage.setItem('token', token);
        navigation.navigate('ConsumptionScreen');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginWithFirebase = () => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (_firebaseUser) {
        setToken(_firebaseUser);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsLoading(false);
        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password.');
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  const registerWithFirebase = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter an valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (_firebaseUser) {
        Alert.alert('user registered!');
        setEmail('');
        setPassword('');
        setToken(_firebaseUser);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsLoading(false);
        if (errorCode == 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../assets/gas-station-icon.jpeg')}
          />
        </View>
        <View style={styles.criteriaContainer}>
          <View>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login"
              disabled={isLoading || (!email && !password)}
              onPress={loginWithFirebase}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Sign Up"
              disabled={isLoading || (!email && !password)}
              onPress={registerWithFirebase}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  criteriaContainer: {
    padding: 12,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  button: {
    marginVertical: 5,
  },
});

export default AuthorizationScreen;
