import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBZSkdLjhEapcQC15FVwup0Bz9v4bW8GoA",
    authDomain: "ecommerce-361d1.firebaseapp.com",
    databaseURL: "https://ecommerce-361d1.firebaseio.com",
    projectId: "ecommerce-361d1",
    storageBucket: "ecommerce-361d1.appspot.com",
    messagingSenderId: "155677685511",
    appId: "1:155677685511:web:b7be34918498a7325af7a2",
    measurementId: "G-9MVQDEW1VW"
  };
// create user profile

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){//check if document is not exist 
    const {displayName, email} = userAuth;//get user login with google
    const createAt = new Date();//get date when login with google

    try {
      // set document for collection
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}


// import date from js to firestore

export const addCollectionAndDocuments  = async (collectionKey, objectsToAdd)=> {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();//to write one or more document

  //loop over each object 
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();//point to object with own unique ID 
    batch.set(newDocRef, obj);//set of value 
  });
  //batch.commit() return one promise
  return await batch.commit(); // return await batch commit before we save this file
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// set up login with google
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
