import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCzhQhFVwg6874lOoTRNJzEpxikaZn83DA",
  authDomain: "recipe-book-79ebb.firebaseapp.com",
  databaseURL: "https://recipe-book-79ebb.firebaseio.com",
  projectId: "recipe-book-79ebb",
  storageBucket: "recipe-book-79ebb.appspot.com",
  messagingSenderId: "940005700930"
};
const firebaseApp = firebase.initializeApp(config);

// export firestore database
export default firebaseApp.firestore();
