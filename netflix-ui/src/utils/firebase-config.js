import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBk-I_E-HaSJna6tk4NS2Ei0oriOOVTtdk",
  authDomain: "react-netflix-clone-92199.firebaseapp.com",
  projectId: "react-netflix-clone-92199",
  storageBucket: "react-netflix-clone-92199.appspot.com",
  messagingSenderId: "125344435111",
  appId: "1:125344435111:web:67416d0b48b17a01fd4482",
  measurementId: "G-G9YBCWJ26C"

};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);