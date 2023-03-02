import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbeBj-rA8e0RyqrW-aNKjkjxbJ_7Tj8YA",
  authDomain: "verify-d4d2e.firebaseapp.com",
  projectId: "verify-d4d2e",
  storageBucket: "verify-d4d2e.appspot.com",
  messagingSenderId: "594495620876",
  appId: "1:594495620876:web:88ffd6764f4e73dab4ab29",
  measurementId: "G-TFJKXTE0DS"
};
const app = initializeApp(firebaseConfig);
export default app;