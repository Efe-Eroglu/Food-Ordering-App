import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8DOIB5bcH5xRtiR-UeIl-s0aVRoDAxOk",
  authDomain: "hamburgerci-f17fd.firebaseapp.com",
  projectId: "hamburgerci-f17fd",
  storageBucket: "hamburgerci-f17fd.appspot.com",
  messagingSenderId: "609270533710",
  appId: "1:609270533710:web:2ebd83a060214cd00d3d1f"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = getFirestore();

export { auth, db }; 
