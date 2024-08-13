import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
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
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
