import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBbkDR1eiY9sdtCJey3gnS2Rhu4uVq_1IU",
  authDomain: "shoppingify-react.firebaseapp.com",
  projectId: "shoppingify-react",
  storageBucket: "shoppingify-react.appspot.com",
  messagingSenderId: "496910144590",
  appId: "1:496910144590:web:a4c4584cbee86d31095f1f",
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, GoogleProvider };
