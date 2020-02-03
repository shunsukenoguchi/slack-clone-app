import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
 const config = {
    apiKey: "AIzaSyBYPBubZt_tDs87txtxpQBzE8dV_yoBrxg",
    authDomain: "slack-clone-app-ea799.firebaseapp.com",
    databaseURL: "https://slack-clone-app-ea799.firebaseio.com",
    projectId: "slack-clone-app-ea799",
    storageBucket: "slack-clone-app-ea799.appspot.com",
    messagingSenderId: "162784420061",
    appId: "1:162784420061:web:a53bbd7352ea15a419fb34",
    measurementId: "G-HKKXZ5EH4J"
 }
 firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
 firebase,
 db
}