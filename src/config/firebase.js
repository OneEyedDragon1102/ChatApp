import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyxhM66Wtg1zTa3s2w3kqKRcpNFhLTXe4",
  authDomain: "chater-78d2e.firebaseapp.com",
  projectId: "chater-78d2e",
  storageBucket: "chater-78d2e.appspot.com",
  messagingSenderId: "1085549009714",
  appId: "1:1085549009714:web:3923890b781b97c433952b",
  measurementId: "G-Q1V1DCE21J"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
