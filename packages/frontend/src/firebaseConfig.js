// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLM7gveCt_w7BR30j8kcTIua5rIpf8Hrs",
  authDomain: "elparadisogonzalo-dev.firebaseapp.com",
  projectId: "elparadisogonzalo-dev",
  storageBucket: "elparadisogonzalo-dev.firebasestorage.app",
  messagingSenderId: "958787376532",
  appId: "1:958787376532:web:6db30cc723488df789eb81",
  measurementId: "G-W79D7JLZVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
