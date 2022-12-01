import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'advent-calendar-viola.firebaseapp.com',
  projectId: 'advent-calendar-viola',
  storageBucket: 'advent-calendar-viola.appspot.com',
  messagingSenderId: '944000079155',
  appId: '1:944000079155:web:292bb19186dd7c629bda46',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
