import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBPMMI47hU92iJVHr6ZZ9D8vUEK7qHpeho",
    authDomain: "instagram-clone-ed8d5.firebaseapp.com",
    databaseURL: "https://instagram-clone-ed8d5.firebaseio.com",
    projectId: "instagram-clone-ed8d5",
    storageBucket: "instagram-clone-ed8d5.appspot.com",
    messagingSenderId: "980934555348",
    appId: "1:980934555348:web:9fc266da542858873f2d41",
    measurementId: "G-8FQQV6BW2N"
  }) ;

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };