// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgKTU86XQ42AvJ0np9yliTvej_4s4GDB0",
  authDomain: "instagram-app-2a405.firebaseapp.com",
  projectId: "instagram-app-2a405",
  storageBucket: "instagram-app-2a405.appspot.com",
  messagingSenderId: "21358205323",
  appId: "1:21358205323:web:4ea93580252ae5804e778e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { app, db, storage, auth };
