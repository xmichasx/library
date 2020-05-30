import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBb3zf0ZXFvbyHrb82Z5Lb1oKiNvn0kMpI",
    authDomain: "library-ac81e.firebaseapp.com",
    databaseURL: "https://library-ac81e.firebaseio.com",
    projectId: "library-ac81e",
    storageBucket: "library-ac81e.appspot.com",
    messagingSenderId: "701565369490",
    appId: "1:701565369490:web:afb054dccdf8855e583a4b",
    measurementId: "G-LLGTSBST2Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;