
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUHRfnLnoVMyeQQ-7yPoEdSmqdqcUX3E4",
  authDomain: "clone-d07e9.firebaseapp.com",
  projectId: "clone-d07e9",
  storageBucket: "clone-d07e9.firebasestorage.app",
  messagingSenderId: "287062831588",
  appId: "1:287062831588:web:7167b1d0bd2dd071a157f1",
};

// Initialize Firebase (with check)
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (!/already initialized/.test(error.message)) {
    console.error("Firebase initialization error:", error);
  }
  app = firebase.app(); // if already initialized, use the existing app
}

export const auth = getAuth(app);
export const db = getFirestore(app);