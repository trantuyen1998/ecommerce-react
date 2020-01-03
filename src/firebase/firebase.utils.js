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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// set up login with google
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
