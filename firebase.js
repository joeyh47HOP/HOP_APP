// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWz-ssg-21jV6vAJFg6Lj9egdDFfFagnc",
  authDomain: "hopapp1.firebaseapp.com",
  projectId: "hopapp1",
  storageBucket: "hopapp1.appspot.com",
  messagingSenderId: "973394214626",
  appId: "1:973394214626:ios:53db3d6ac0d669c0aba8bb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);