import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

console.log('firebase/config.js: Initializing');

try {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: "https://kashurpedia-default-rtdb.firebaseio.com/"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const database = getDatabase(app);
  console.log('firebase/config.js: Initialized');
} catch (error) {
  console.error('firebase/config.js: Initialization failed', error);
  throw error;
}
