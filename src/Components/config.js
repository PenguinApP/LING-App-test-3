import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA57DUcNR8v9ru5z-hHQgQbVLJmDBAF-G4",
    authDomain: "test-project-ling.firebaseapp.com",
    databaseURL: "https://test-project-ling.firebaseio.com",
    projectId: "test-project-ling",
    storageBucket: "test-project-ling.appspot.com",
    messagingSenderId: "989521686632"
};
firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const provider = new firebase.auth.FacebookAuthProvider();
export const provider2 = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;