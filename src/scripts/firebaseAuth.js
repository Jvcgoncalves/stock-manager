import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCu-88XrskG_5KRp-QX1ZS4b0QcdBq1Xf8",
  authDomain: "stock-store-1b54d.firebaseapp.com",
  projectId: "stock-store-1b54d",
  storageBucket: "stock-store-1b54d.appspot.com",
  messagingSenderId: "92970941888",
  appId: "1:92970941888:web:396d884f6f725eb0ab5c25"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const dataBase = getFirestore();