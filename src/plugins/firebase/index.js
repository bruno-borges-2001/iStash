import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCvf4evWHuGYMpuTJbo-QAq8TOF_WweA6E",
  authDomain: "istash.firebaseapp.com",
  projectId: "istash",
  storageBucket: "istash.appspot.com",
  messagingSenderId: "838654125998",
  appId: "1:838654125998:web:df6fe17c410c5632b2ca3f",
  measurementId: "G-0GBS97EVTZ",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
