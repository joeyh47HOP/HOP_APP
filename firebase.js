// firebase.js
// import { initializeApp } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDWz-ssg-21jV6vAJFg6Lj9egdDFfFagnc',
//   authDomain: 'hopapp1.firebaseapp.com',
//   projectId: 'hopapp1',
//   storageBucket: 'hopapp1.appspot.com',
//   messagingSenderId: '973394214626',
//   appId: '1:973394214626:ios:53db3d6ac0d669c0aba8bb',
// };

// const app = initializeApp(firebaseConfig);

// let auth;
// try {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// } catch (e) {
//   // fallback if already initialized
//   const { getAuth } = require('firebase/auth');
//   auth = getAuth(app);
// }

// export { app, auth };

// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDWz-ssg-21jV6vAJFg6Lj9egdDFfFagnc',
  authDomain: 'hopapp1.firebaseapp.com',
  projectId: 'hopapp1',
  storageBucket: 'hopapp1.appspot.com',
  messagingSenderId: '973394214626',
  appId: '1:973394214626:ios:53db3d6ac0d669c0aba8bb',
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  const { getAuth } = require('firebase/auth');
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
