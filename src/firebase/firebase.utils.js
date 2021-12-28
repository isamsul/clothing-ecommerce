import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAna6Z0z9wqhmtmqxnIiErT3gFuGlHDSpI",
  authDomain: "clothing-ecommerce-2.firebaseapp.com",
  projectId: "clothing-ecommerce-2",
  storageBucket: "clothing-ecommerce-2.appspot.com",
  messagingSenderId: "677445617495",
  appId: "1:677445617495:web:8a1bcaec5a0ac954e32012",
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const auth = getAuth();

const provider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, provider);

export {firebase, auth, firestore, signInWithGoogle};
