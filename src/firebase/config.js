import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

// Log Firebase initialization start
console.log('firebase/config.js: Starting Firebase initialization');

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

  // Validate config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Missing Firebase configuration values');
  }

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const database = getDatabase(app);
  export const analytics = getAnalytics(app);
  console.log('firebase/config.js: Firebase initialized successfully');
} catch (error) {
  console.error('firebase/config.js: Failed to initialize Firebase:', error);
  throw error; // Let ErrorBoundary or index.jsx catch this
}
