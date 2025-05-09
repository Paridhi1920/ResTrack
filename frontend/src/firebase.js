// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyACC3bEj2OULj-NiNFbS9986riH1FV-KY0",
    authDomain: "restrackauth.firebaseapp.com",
    projectId: "restrackauth",
    storageBucket: "restrackauth.firebasestorage.app",
    messagingSenderId: "275892109880",
    appId: "1:275892109880:web:60bf0c075a6577a8e49ccd",
    measurementId: "G-8KVDG94WQ2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
