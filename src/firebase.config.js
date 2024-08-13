// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8qSuBbBI6tBMI5mXi_-BUp6OXcOOExuE",
  authDomain: "henglechat.firebaseapp.com",
  databaseURL: "https://henglechat-default-rtdb.firebaseio.com",
  projectId: "henglechat",
  storageBucket: "henglechat.appspot.com",
  messagingSenderId: "20879968312",
  appId: "1:20879968312:web:744a124153b0988d49becd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
