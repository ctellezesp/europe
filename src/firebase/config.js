import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyAHol8VmY_2oLFxPkDQmwLuOUNwtqsWj-c",
    authDomain: "uefa-leagues.firebaseapp.com",
    projectId: "uefa-leagues",
    storageBucket: "uefa-leagues.appspot.com",
    messagingSenderId: "128572033439",
    appId: "1:128572033439:web:41c853d35e6afc47cb95aa",
    measurementId: "G-JZCMNB72TJ"
}

class Firebase{

  constructor(){
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.storage = firebase.storage();
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }
}

export default new Firebase();
