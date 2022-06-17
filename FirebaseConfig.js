import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

// need to run: npm install --save firebase
// We will use the JS SDK with React Native

const firebaseConfig = {
  apiKey: "AIzaSyDrh9C0lES30KEA4VOTj2GY6aebXxgnH-w",
  authDomain: "info-6129-react-native.firebaseapp.com",
  databaseURL: "https://info-6129-react-native-default-rtdb.firebaseio.com",
  projectId: "info-6129-react-native",
  storageBucket: "info-6129-react-native.appspot.com",
  messagingSenderId: "209107002321",
  appId: "1:209107002321:web:76edd8bb4c03cb6252f6f0"
};

var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}else {
  app = firebase.app(); // if already initialized, use that one
}

const db = app.database();
const auth = firebase.auth();

export { db, auth };