import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getFirestore } from "firebase/firestore/lite";
import {
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

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

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, "users", userAuth.uid);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);
  objectToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => (
    {...accumulator, [collection.title.toLowerCase()]: collection}
  ), {});
};

export {
  firebase,
  auth,
  firestore,
  onSnapshot,
  doc,
  collection,
  signInWithGoogle,
  createUserProfileDocument,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
