// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs2rpoC45-65Zmg7woqodqsy84xKBbHS8",
  authDomain: "mysns-d0eaf.firebaseapp.com",
  projectId: "mysns-d0eaf",
  storageBucket: "mysns-d0eaf.appspot.com",
  messagingSenderId: "304433350151",
  appId: "1:304433350151:web:29a7c9f6406d2952a94ca2",
  measurementId: "G-79SPFHDMN8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

