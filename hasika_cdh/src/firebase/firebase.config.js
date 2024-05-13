// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA09xY9k-XfaC60sl8y9P0zcgJ_v6CEF5g",
  authDomain: "cbit-career-hub.firebaseapp.com",
  projectId: "cbit-career-hub",
  storageBucket: "cbit-career-hub.appspot.com",
  messagingSenderId: "799623576723",
  appId: "1:799623576723:web:570e048e5afc2e86456166"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;