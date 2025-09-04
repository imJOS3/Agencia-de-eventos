// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMQch9_TwYQzI5i_PPcfjN7Uh2OehnJmw",
  authDomain: "skailer.firebaseapp.com",
  projectId: "skailer",
  storageBucket: "skailer.appspot.com",
  messagingSenderId: "229151780456",
  appId: "1:229151780456:web:322e2dcfe08e8c261195dd",
  measurementId: "G-QNYEJDK100"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
